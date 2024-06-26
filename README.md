
# MovieHeistApp

## Overview

MovieHeistApp is a web application that provides users with movie-related functionalities such as authentication, movie preferences, reviews, and more. This project is divided into three main parts:

1. **Frontend:** A React application located in the `movieheistapp` folder.
2. **Flask Backend:** A Flask backend for specific functionalities located in the `flaskbackend` folder.
3. **Node Backend:** A Node.js backend for database operations located in the `db-server` folder.

## Project Structure

```
.
├── flaskbackend
├── db-server
└── movieheistapp
```

## Setup Instructions

### Prerequisites

- Node.js and npm
- Python and pip
- MongoDB
- React
- Flask

### Frontend Setup (React)

1. Navigate to the `movieheistapp` folder:

    ```sh
    cd movieheistapp
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Start the React application:

    ```sh
    npm start
    ```

### Flask Backend Setup

1. Navigate to the `flaskbackend` folder:

    ```sh
    cd flaskbackend
    ```

2. Create a virtual environment:

    ```sh
    python -m venv venv
    ```

3. Activate the virtual environment:

    - On Windows:

        ```sh
        venv\Scripts\activate
        ```

    - On macOS and Linux:

        ```sh
        source venv/bin/activate
        ```

4. Install the dependencies:

    ```sh
    pip install -r requirements.txt
    ```

5. Start the Flask application:

    ```sh
    flask run
    ```

### Node Backend Setup

1. Navigate to the `db-server` folder:

    ```sh
    cd db-server
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Start the Node.js server:

    ```sh
    npm start
    ```

## Configuration

Ensure that your MongoDB server is running and accessible to both the Flask and Node.js backends. Update the connection strings in the respective configuration files as needed.

### Environment Variables

Create a `.env` file in the root directory of both `flaskbackend` and `db-server` to store environment variables.

**Example `.env` for Node backend (`db-server`):**

```
MONGO_URI=mongodb://localhost:27017/movieheist
PORT=7676
```

**Example `.env` for Flask backend (`flaskbackend`):**

```
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URI=mongodb://localhost:3000/movieheist
```

## Usage

Once all the servers are running, you can access the React application in your browser at `http://localhost:3000`. The React app will interact with both the Flask and Node.js backends to provide the full functionality of MovieHeistApp.

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
