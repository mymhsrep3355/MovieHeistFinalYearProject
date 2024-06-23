from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import SnowballStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import BernoulliNB
from imblearn.over_sampling import RandomOverSampler
from sklearn.metrics import accuracy_score
import nltk

app = Flask(__name__)

# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

# Reading the dataset of IMDb movie reviews
data = pd.read_csv('./IMDB-Dataset.csv')

# Cleaning functions
def clean(text):
    cleaned = re.compile(r'<.*?>')  # Regular expression to remove HTML tags
    return re.sub(cleaned, '', text)

def is_special(text):
    rem = ''
    for i in text:
        if i.isalnum():
            rem = rem + i
        else:
            rem = rem + ' '
    return rem

def preprocess(text):
    text = clean(text)  # Clean the text by removing HTML tags
    text = is_special(text)  # Remove special characters
    text = text.lower()  # Convert text to lowercase
    stop_words = set(stopwords.words('english'))  # Get a set of stopwords
    words = word_tokenize(text)  # Tokenize the text into words
    words = [w for w in words if w not in stop_words]  # Remove stopwords from the text
    ss = SnowballStemmer('english')  # Initialize a Snowball stemmer for English
    return " ".join([ss.stem(w) for w in words])  # Apply stemming to each word and join them back into a string

# Preprocessing the dataset
data['review'] = data['review'].apply(preprocess)  # Apply the preprocess function to each review in the dataset

# Model training
cv = CountVectorizer(max_features=1000)  # Initialize a CountVectorizer with a maximum of 1000 features
X = cv.fit_transform(data['review'])  # Convert the preprocessed reviews into a matrix of token counts
y = data['sentiment']  # Get the sentiment labels
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)  # Split the data into training and testing sets
oversampler = RandomOverSampler(random_state=42)  # Initialize a RandomOverSampler to handle class imbalance
X_train_resampled, y_train_resampled = oversampler.fit_resample(X_train, y_train)  # Resample the training data to balance the classes
model = BernoulliNB(alpha=1.0, fit_prior=True)  # Initialize a Bernoulli Naive Bayes model
model.fit(X_train_resampled, y_train_resampled)  # Train the model on the resampled training data

@app.route('/sentiments', methods=['POST'])
def predict_sentiment():
    data = request.get_json()  # Get the JSON data from the request
    user_review = data.get('review')  # Get the review from the JSON data

    if not user_review:
        return jsonify({'error': 'Review is required in JSON format'}), 400  # Return an error if review is not provided

    review = preprocess(user_review)  # Preprocess the user review
    review_vectorized = cv.transform([review])  # Vectorize the preprocessed review
    prediction = model.predict(review_vectorized)[0]  # Make a prediction using the trained model
    prob_scores = model.predict_proba(review_vectorized)[0]  # Get the probability scores for each class
    positive_score = prob_scores[1] * 10  # Scale the positive probability to a score out of 10
    sentiment = "Positive && recommended" if prediction == 1 else "Negative && Not Recommended"  # Determine the sentiment based on the prediction
    
    return jsonify({'sentiment': sentiment, 'score': positive_score})  # Return the sentiment and score as JSON

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask application in debug mode
