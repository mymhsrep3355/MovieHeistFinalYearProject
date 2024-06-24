from flask import Flask, request, jsonify
# flask is a web framework for python to create web applications and APIs we create routes and endpoints using flask for models to interact with the frontend
import pandas as pd  # pandas is a data manipulation library for python like data frames in in our case we are using it to read the csv file
from openai import OpenAI  # openai is a library to interact with the openai api
# tfidfvectorizer is a library to convert a collection of raw documents reviews are raw and unprocessed we process them using model and technique to a matrix of TF-IDF features
from sklearn.feature_extraction.text import TfidfVectorizer
# cosine similarity is a metric used to measure how similar our movies reviews are to other processed data matrix
from sklearn.metrics.pairwise import cosine_similarity
import difflib  # to find the closest match of the movie name
from flask_cors import CORS  # to allow cross origin requests like when we run this server it runs on 5000 port and our frontend runs on 3000 port so to allow requests from different ports we use cors
import requests  # to make http requests to the api to get the movie data or to open ai
import torch  # torch is a library for machine learning and deep learning to train data splits and to make predictions
# transformers is a library to use pre-trained models from hugging face
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import json  # to parse the json data

# creating an instance of the flask app starting point of the flask app
app = Flask(__name__)
# to allow requests from different ports like 3000 and 5000
CORS(app, origins="http://localhost:3000")

# reading the csv file using pandas library
movies = pd.read_csv('./movies.csv')

# features of the data we are using to recommend the movies these data features from the data set are captured and pre - processing to recommend the movies
# data_features = ['keywords', 'cast', 'tagline', 'genres', 'director', 'title']

# # filling the missing values with empty string if any missing values are present in the data set
# movies[data_features] = movies[data_features].fillna('')

# combined_features = movies['genres'] + ' ' + movies['keywords'] + ' ' + \
#     movies['tagline'] + ' ' + movies['cast'] + ' ' + \
#     movies['director'] + ' ' + \
#     movies['title']  # combining the features of the data set to process and recommend the movies

data_features = ['keywords', 'cast', 'tagline', 'genres', 'director', 'title']
movies[data_features] = movies[data_features].fillna('')
combined_features = movies['genres'] + ' ' + movies['keywords'] + ' ' + movies['tagline'] + ' ' + \
                    movies['cast'] + ' ' + movies['director'] + ' ' + movies['title']



# for sentimental model we use
# Using the TfidfVectorizer to vectorize the features of the data
# The TfidfVectorizer converts a collection of raw documents (reviews) into a matrix of TF-IDF (Term Frequency-Inverse Document Frequency) features
# TF-IDF is a numerical statistic that reflects how important a word is to a document in a collection or corpus
# It assigns a weight to each word based on its frequency in the document and its rarity in the entire corpus
# This vectorization process helps in representing the textual features of the data in a numerical format that can be used for further analysis
# vectorizer = TfidfVectorizer()
# vectorizing_features = vectorizer.fit_transform(combined_features)
# similar = cosine_similarity(vectorizing_features, vectorizing_features)


vectorizer = TfidfVectorizer()
vectorizing_features = vectorizer.fit_transform(combined_features)
similar = cosine_similarity(vectorizing_features, vectorizing_features)

model = AutoModelForSequenceClassification.from_pretrained(
    "Kaludi/Reviews-Sentiment-Analysis")  # classification of pre trained model of kaludi reviews sentiment analysis
tokenizer = AutoTokenizer.from_pretrained("Kaludi/Reviews-Sentiment-Analysis")


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


# recommending the movies based on the user input model function to recommend the movies
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

client = OpenAI(
    # openai api key to interact with the openai api to get the responses from the model
    
)

# endpoint for the questions
@app.route("/questions")  # creating a route for the questions
def getMovieName():  # function to get the movie name
    # Retrieve movie name from query parameters (URL) https://localhost:5000/questions?name=movie_name
    # Default to empty string if 'name' is not provided
    # getting the movie name from the query parameters
    name = request.args.get('name', '')
    print(name)  # printing the movie name for checking
    if not name:  # if the movie name is not provided
        # returning the movie name is required with status code 400
        return "Movie name is required.", 400

    # prompt to create 5 multiple choice questions related to the movie name and mention its correct option for each question
    # prompt = f"Create me 5 multiple-choice questions related to the movie {name} and mention its correct option for each question and make sure correct options to be accurate according to movie:\n"
    prompt = (
        f"Create 5 multiple-choice questions related to the movie '{name}'. "
        "Each question should have 4 options labeled as 'A', 'B', 'C', and 'D'. "
        "Provide the correct option for each question. The response should be a JSON array with objects in the following format:\n"
        "{"
        "  'question': 'The question text?',"
        "  'options': {"
        "    'A': 'Option A text',"
        "    'B': 'Option B text',"
        "    'C': 'Option C text',"
        "    'D': 'Option D text'"
        "  },"
        "  'correct_option': 'A'"
        "}"
    )
    print(prompt) # printing the prompt for checking
    response = client.chat.completions.create( # getting the response from the model using the prompt
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}, {
            "role": "user", "content": "Please ensure the response is in valid JSON with correct and accurate options"}], # ensuring the response is in valid json format to parse the data
        temperature=0.5,
        max_tokens=1024
    )
    print(response)
    content = response.choices[0].message.content # getting the content of the response
    # print(content)
    try:
        parsed_json = json.loads(content) # parsing the json data
        return parsed_json
    except json.JSONDecodeError as e: # if there is any parsing error
        print("Parsing error:", e)
    return content


# questions quiz parser
def parse_questions(questions_string):
    questions = [] # empty list to store the questions
    current_question = {} # empty dictionary to store the current question

    for line in questions_string.strip().split('\n'): # iterating through the questions string to parse the questions
        line = line.strip()  # stripping the line to remove the white spaces from the line empty spaces
        if line.startswith("Correct answer:"): # if the line starts with correct answer then it is the correct answer of the question
            current_question["correct_option"] = line.split(":")[1].strip()[ # getting the correct option of the question
                0].lower() # converting the correct option to lower case
            questions.append(current_question) # appending the current question to the questions list
            current_question = {} # resetting the current question to empty dictionary to store the next question
        else: # if the line does not start with correct answer then it is the question or the options of the question
            if line: # if the line is not empty
                parts = line.split(".", 1) # splitting the line with the dot to get the question and the options 
                if len(parts) == 2: # if the length of the parts is 2 then it is the question
                    current_question["question"] = parts[1].strip() # getting the question of the current question and stripping the white spaces 
                else:
                    current_question["options"] = current_question.get( # getting the options of the current question and appending/concate the options to the current question 
                        "options", []) + [line.strip()] # stripping the white spaces from the options and appending/concating the options to the current question

    return questions # returning the questions to the user this is what we actually receive as response from the model


# endpoint for the recommendations
@app.route('/recommend_movies', methods=['POST'])
def recommend_movies():
    user_movies = request.json.get('user_movies', [])
    user_genres = request.json.get('user_genres', [])
    recommended_movies = get_recommended_movies(user_movies, user_genres)
    api_key = 'b93a64480573ce5248c28b200d79d029'
    recommended_movies_data = {movie_title: search_movie(api_key, movie_title) for movie_title in recommended_movies}
    return jsonify({'recommended_movies': recommended_movies_data})


# end point for the sentimental analysis
@app.route('/sentiments', methods=["POST"]) # creating a route for the sentimental analysis
def sentimental_analysis(): # function to analyze the sentiment of the reviews
    review = request.json.get("review") # getting the review from the request coming from the frontend as "review"
    inputs = tokenizer(review, return_tensors="pt") # tokenizing the review using the tokenizer to convert the review to 
    outputs = model(**inputs) # getting the outputs of the model using the inputs of the review
    probabilities = torch.softmax(outputs.logits, dim=1) # getting the probabilities of the outputs of the model 
    predicted_class = torch.argmax(probabilities, dim=1).item() # getting the predicted class of the review
    if predicted_class == 1: # if the predicted class is 1 then the sentiment is positive and recommended
        sentiment = "positive && recommended"
    else:
        sentiment = "negative && not recommended" # if the predicted class is 0 then the sentiment is negative and not recommended
    response_data = {"sentiment": sentiment}    # returning the sentiment to the user
    return jsonify(response_data)


@app.route('/questionGeneration', methods=['POST']) 
def questionGen():
    data = request.get_json()
    print(parse_questions(getMovieName(data)))
    return jsonify(parse_questions(getMovieName(data)))


if __name__ == '__main__':
    app.run(debug=True)
