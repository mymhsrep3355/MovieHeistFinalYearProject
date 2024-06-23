import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import difflib
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# Load movie dataset
movies = pd.read_csv('./movies.csv')

# Fill missing values and combine features
data_features = ['keywords', 'cast', 'tagline', 'genres', 'director', 'title']
movies[data_features] = movies[data_features].fillna('')
combined_features = movies['genres'] + ' ' + movies['keywords'] + ' ' + movies['tagline'] + ' ' + \
                    movies['cast'] + ' ' + movies['director'] + ' ' + movies['title']

# Vectorize combined features
vectorizer = TfidfVectorizer()
vectorizing_features = vectorizer.fit_transform(combined_features)
similar = cosine_similarity(vectorizing_features, vectorizing_features)

def search_movie(api_key, movie_title):
    url = f'https://api.themoviedb.org/3/search/movie'
    params = {
        'api_key': api_key,
        'query': movie_title,
        'language': 'en-US',
        'include_adult': False
    }
    response = requests.get(url, params=params)
    data = response.json()
    if data['results']:
        return data['results'][0]
    return {}

def get_recommended_movies(user_movies, user_genres=None, recommendations=5):
    recommended_movies = []
    user_movie_indices = []

    for movie_name in user_movies:
        find_closest = difflib.get_close_matches(movie_name, movies['title'].tolist(), n=1)
        if find_closest:
            nearest = find_closest[0]
            index = movies[movies.title == nearest].index[0]
            user_movie_indices.append(index)

    avg_similarity_scores = similar[user_movie_indices].mean(axis=0)

    genre_filtered_indices = []
    if user_genres:
        for idx, row in movies.iterrows():
            movie_genres = row['genres'].split()
            if any(genre in user_genres for genre in movie_genres):
                genre_filtered_indices.append(idx)

    for idx, score in sorted(enumerate(avg_similarity_scores), key=lambda x: x[1], reverse=True):
        if not user_genres or idx in genre_filtered_indices:
            title_from_index = movies.iloc[idx]['title']
            if title_from_index not in user_movies and title_from_index not in recommended_movies:
                recommended_movies.append(title_from_index)
                if len(recommended_movies) >= recommendations:
                    break

    return recommended_movies

@app.route('/recommend_movies', methods=['POST'])
def recommend_movies():
    user_movies = request.json.get('user_movies', [])
    user_genres = request.json.get('user_genres', [])
    recommended_movies = get_recommended_movies(user_movies, user_genres)
    api_key = 'b93a64480573ce5248c28b200d79d029'
    recommended_movies_data = {movie_title: search_movie(api_key, movie_title) for movie_title in recommended_movies}
    return jsonify({'recommended_movies': recommended_movies_data})

if __name__ == '__main__':
    app.run(debug=True)
