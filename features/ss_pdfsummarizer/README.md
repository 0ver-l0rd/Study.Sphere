# PDF Summarizer with OpenAI

This is a Flask web application that allows users to upload PDF files, upload them to Google Drive, and use OpenAI's GPT-4 to generate a summary of the PDF content. The summary is then stored in a PostgreSQL database for future reference.
Features

    Upload PDF files to Google Drive.
    Download the uploaded PDF file from Google Drive for processing.
    Extract text from PDF using PyPDF2.
    Generate a summary of the extracted text using OpenAI's GPT-4 API.
    Store summaries in a PostgreSQL database.
    Handle large PDF files with token limits.
    Provides error handling and retry mechanisms for database transactions.

Table of Contents

    Prerequisites
    Installation
    Project Structure
    Environment Variables
    Running the Application
    Usage
    Contributing
    License

Prerequisites

Before you begin, ensure you have the following software installed:

    Python 3.7 or higher
    PostgreSQL database
    Google Cloud account (with access to Google Drive API and a service account)
    OpenAI API key

Installation

    Clone the repository:

    bash

git clone https://github.com/your-repository/flask-pdf-summarizer.git
cd flask-pdf-summarizer

Set up a virtual environment (optional but recommended):

bash

python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

Install the required dependencies:

bash

    pip install -r requirements.txt

    Configure your PostgreSQL database:

    Ensure you have a running PostgreSQL instance and create a database for this project. Then update the DATABASE_URL in the .env file with your PostgreSQL connection string.

    Set up Google Drive API:
        Go to the Google Cloud Console.
        Create a project and enable the Google Drive API.
        Create a service account and download the service_account.json file.
        Place the service_account.json file in the root of your project.

    Get your OpenAI API key:
        Sign up for OpenAI and get your API key from the OpenAI platform.
        Update the OpenAI API key in the openai.api_key line in the Flask app.

Project Structure

The project consists of the following main files:

bash

├── app.py                # Main Flask application
├── requirements.txt      # Dependencies
├── service_account.json  # Google Drive service account credentials (ignored by Git)
├── templates/
│   └── index.html        # HTML template for the web interface
├── uploads/              # Directory to temporarily store uploaded files
└── README.md             # Documentation file

Main Components

    Google Drive Integration: Handles file uploads and downloads to Google Drive using the Google API Client.
    OpenAI Integration: Summarizes the content of PDF files using GPT-4 API.
    SQLAlchemy: Manages database interactions and stores summaries.
    PyPDF2: Used to extract text from the uploaded PDFs.

Environment Variables

Create a .env file in the root directory to securely store sensitive information like your database URL and OpenAI API key.

env

DATABASE_URL=postgresql://your_db_user:your_db_password@your_db_host/your_db_name
OPENAI_API_KEY=your_openai_api_key
PARENT_FOLDER_ID=your_google_drive_folder_id

Running the Application

    Run the Flask application:

    bash

    python app.py

    The app will be hosted at http://localhost:5000.

    Access the app:

    Open your web browser and go to http://localhost:5000.

Usage

    Upload a PDF:
        On the home page, upload a PDF file.
        The file will be temporarily saved and uploaded to Google Drive.

    Text Extraction and Summarization:
        The application will extract text from the uploaded PDF.
        OpenAI's GPT-4 API is used to summarize the extracted text.

    Store the Summary:
        The summary will be stored in the PostgreSQL database.
        You can see the summary and the Google Drive file ID on the page.

    Error Handling:
        If there are issues such as file size exceeding the token limit or database errors, the application will notify you.

This documentation covers how to set up, run, and use the application. For advanced customization or any changes, please refer to the code comments.
