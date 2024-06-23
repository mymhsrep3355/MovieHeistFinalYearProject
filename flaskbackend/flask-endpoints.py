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
data_features = ['keywords', 'cast', 'tagline', 'genres', 'director', 'title']

# filling the missing values with empty string if any missing values are present in the data set
movies[data_features] = movies[data_features].fillna('')

combined_features = movies['genres'] + ' ' + movies['keywords'] + ' ' + \
    movies['tagline'] + ' ' + movies['cast'] + ' ' + \
    movies['director'] + ' ' + \
    movies['title']  # combining the features of the data set to process and recommend the movies


# for sentimental model we use
# Using the TfidfVectorizer to vectorize the features of the data
# The TfidfVectorizer converts a collection of raw documents (reviews) into a matrix of TF-IDF (Term Frequency-Inverse Document Frequency) features
# TF-IDF is a numerical statistic that reflects how important a word is to a document in a collection or corpus
# It assigns a weight to each word based on its frequency in the document and its rarity in the entire corpus
# This vectorization process helps in representing the textual features of the data in a numerical format that can be used for further analysis
vectorizer = TfidfVectorizer()
vectorizing_features = vectorizer.fit_transform(combined_features)

similar = cosine_similarity(vectorizing_features, vectorizing_features)
model = AutoModelForSequenceClassification.from_pretrained(
    "Kaludi/Reviews-Sentiment-Analysis")  # classification of pre trained model of kaludi reviews sentiment analysis
tokenizer = AutoTokenizer.from_pretrained("Kaludi/Reviews-Sentiment-Analysis")


def search_movie(api_key, movie_title):
    # searching the movie using the api key and movie title that is recommended by model
    url = f'https://api.themoviedb.org/3/search/movie'
    params = {
        'api_key': api_key,
        'query': movie_title,
        'language': 'en-US',
        'include_adult': False
    }
    response = requests.get(url, params=params)
    data = response.json()  # converting the response to json object
    return data


# recommending the movies based on the user input model function to recommend the movies
def get_recommended_movies(user_movies, recommendations=5):
    recommended_movies = []  # empty list to store the recommended movies

    user_movie_indices = []  # empty list to store the indices of the user movies

    for movie_name in user_movies:  # iterating through the user movies that are input by the user coming as response from the frontend

        find_closest = difflib.get_close_matches(  # finding the closest match of the movie name using the difflib library
            movie_name, movies['title'].tolist(), n=1)  # getting the closest match of the movie name from the data set

        if find_closest:  # if the closest match is found
            # getting the closest match of the movie name from the data set
            nearest = find_closest[0]

            # getting the index of the movie name from the data set using the closest match
            index = movies[movies.title == nearest].index[0]
            # appending the index of the movie name to the user movie indices list to recommend the movies
            user_movie_indices.append(index)

    # calculating the average similarity scores of the user movies to recommend the movies between the user movies and the data set
    avg_similarity_scores = similar[user_movie_indices].mean(axis=0)

    # iterating through the average similarity scores of the user movies to recommend the movies
    for idx, score in sorted(enumerate(avg_similarity_scores), key=lambda x: x[1], reverse=True):
        # getting the title of the movie from the data set using the index of the movie
        title_from_index = movies.iloc[idx]['title']
        # if the title of the movie is not in the user movies and not in the recommended movies
        if title_from_index not in user_movies and title_from_index not in recommended_movies:
            # appending the title of the movie to the recommended movies list to recommend the movies
            recommended_movies.append(title_from_index)
            # if the length of the recommended movies is greater than or equal to the recommendations 5 is defined up there
            if len(recommended_movies) >= recommendations:
                break

    return recommended_movies  # returning the recommended movies to the user


client = OpenAI(
    # openai api key to interact with the openai api to get the responses from the model
    # api key
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
@app.route('/recommend_movies', methods=['POST']) # creating a route for the recommendations
def recommend_movies(): # function to recommend the movies 
    user_movies = request.json.get('user_movies', []) # getting the user movies from the request coming from the frontend
    recommended_movies = get_recommended_movies(user_movies) # getting the recommended movies based on the user movies using the function get_recommended_movies of the model
    api_key = 'b93a64480573ce5248c28b200d79d029' #tmdb api key to interact with the api to get the movie data like getting ID, Title, Overview, Poster, Release Date, Genres, etc.
    recommended_movies_data = {} # empty dictionary to store the recommended movies data
    for movie_title in recommended_movies: # iterating through the recommended movies to get the movie data 
        movie_data = search_movie(api_key, movie_title) # getting the movie data using the api key and movie title that is recommended by model
        recommended_movies_data[movie_title] = movie_data # appending the movie data to the recommended movies data dictionary to recommend the movies
    print(len(recommended_movies_data)) # printing the length of the recommended movies data for checking
    return jsonify({'recommended_movies': recommended_movies_data}) # returning the recommended movies data to the user in json format


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
