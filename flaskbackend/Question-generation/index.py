
from flask import Flask, request, jsonify
from openai import OpenAI

import requests
app = Flask(__name__)

client = OpenAI(
    api_key="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",
)

def parse_questions(questions_string):
    questions = []
    current_question = {}

    lines = questions_string.strip().split('\n')
    for i in range(0, len(lines), 7):
        question = lines[i].split(". ", 1)[1]
        options = [line.split(") ", 1)[1] for line in lines[i + 1:i + 5]]
        correct_option = lines[i + 6].split(": ")[1].split(") ", 1)[1]

        current_question = {
            "question": question,
            "options": options,
            "correct_option": correct_option
        }
        questions.append(current_question)

    return questions

@app.route('/questionGeneration', methods=['POST'])
def questionGen():
    try:
        data = request.get_json()
        movie_name = data.get('movie_name')
        if movie_name:
            questions_string = getMovieName(movie_name)
            questions = parse_questions(questions_string)
            return jsonify(questions)
        else:
            return jsonify({'error': 'Movie name not provided'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run()

def getMovieName(name):
    prompt = f"Create me 5 multiple-choice questions related to the movie {name} it should be shuffled and mention its correct option:\n"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=1024
    )
    content = response.choices[0].message.content
    return content


def parse_questions(questions_string):
    questions = []
    current_question = {}

    lines = questions_string.strip().split('\n')
    for i in range(0, len(lines), 7):
        question = lines[i].split(". ", 1)[1]
        options = [line.split(") ", 1)[1] for line in lines[i + 1:i + 5]]
        correct_option = lines[i + 6].split(": ")[1].split(") ", 1)[1]

        current_question = {
            "question": question,
            "options": options,
            "correct_option": correct_option
        }
        questions.append(current_question)

    return questions

@app.route('/questionGeneration', methods=['POST'])
def questionGen():
    try:
        data = request.get_json()
        movie_name = data.get('movie_name')
        if movie_name:
            questions_string = getMovieName(movie_name)
            questions = parse_questions(questions_string)
            return jsonify(questions)
        else:
            return jsonify({'error': 'Movie name not provided'})
    except Exception as e:
        return jsonify({'error': str(e)})



 
if __name__ == '__main__':

	app.run()

