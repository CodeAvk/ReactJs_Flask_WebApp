# ReactJs_Flask_WebApp_Securonix
# React + Flask Application

This is a web application built with a React front-end and a Flask back-end. The application allows users to interact with product data stored in an Excel file and supports Google Authentication for user login.

## Project Overview

This application provides an interface for browsing, filtering, and sorting product data. It leverages a RESTful API built with Flask to serve data to a React front-end and uses Google OAuth for authentication.

## Features

- **Paginated Data Retrieval**: Fetch data in paginated format with optional sorting by price.
- **Data Filtering**: Filter data based on manufacturer, category, and product name.
- **Data Sorting**: Sort data based on any column in ascending or descending order.
- **Google Authentication**: Secure user login using Google OAuth.

## Technologies Used

- **Front-end**: React
- **Back-end**: Flask
- **Data Processing**: Pandas, NumPy
- **Cross-Origin Resource Sharing**: Flask-CORS
- **Authentication**: Google OAuth

## Setup and Installation

### Prerequisites

- Python 
- Node.js
- npm (Node Package Manager)
- pip (Python Package Installer)
- Google Cloud Project for OAuth credentials

### Back-end Setup

1. Clone the repository:
    ```sh
    git clone [https://github.com/yourusername/react-flask-app.git](https://github.com/CodeAvk/ReactJs_Flask_WebApp_Securonix.git)
    cd ReactJs_Flask_WebApp_Securonix/backend
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Place your Excel file (`product-data.xls`) in the `backend/data` directory.

5. Set up Google OAuth credentials:
    - Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
    - Create OAuth 2.0 credentials and download the `client_secret.json` file.
    - Place the `client_secret.json` file in the `backend` directory.

6. Run the Flask application:
    ```sh
    python app.py
    ```

### Front-end Setup

1. Navigate to the `frontend` directory:
    ```sh
    cd ../frontend
    ```

2. Install the required npm packages:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add your Google Client ID:
    ```sh
    REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
    ```

4. Start the React application:
    ```sh
    npm start
    ```





## API Endpoints

### Paginated Data Retrieval

- **URL**: `/api/data/<int:page>`
- **Method**: GET
- **Query Params**: 
  - `sort` (optional): Sort order (`asc` or `desc` by price)
- **Response**: JSON array of paginated product data

### Data Filtering

- **URL**: `/api/filter`
- **Method**: POST
- **Body**: JSON object with fields `manufacturer`, `category`, and `productName`
- **Response**: JSON array of filtered product data

### Data Sorting

- **URL**: `/api/sort`
- **Method**: POST
- **Body**: JSON object with fields `column` and `ascending`
- **Response**: JSON array of sorted product data

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.





