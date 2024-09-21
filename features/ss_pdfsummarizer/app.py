# Import necessary libraries and modules
from flask import Flask, request, render_template  # Flask framework to handle web requests and templates
import PyPDF2  # For PDF file reading and text extraction
import os  # To handle file paths and file operations
import openai  # OpenAI API for GPT-4 integration
from sqlalchemy import create_engine, Column, Integer, String, Text  # SQLAlchemy for database handling
from sqlalchemy.ext.declarative import declarative_base  # Base class for models
from sqlalchemy.orm import sessionmaker  # For session management
from googleapiclient.discovery import build  # Google API client for Google Drive operations
from google.oauth2 import service_account  # To handle Google service account authentication
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload  # To upload and download files from Google Drive
import io  # To handle in-memory file operations

# Google Drive API settings
SCOPES = ['https://www.googleapis.com/auth/drive']  # Permissions for Google Drive API
SERVICE_ACCOUNT_FILE = 'service_account.json'  # Path to the Google service account JSON file
PARENT_FOLDER_ID = "1P1I2RBsj48aaPiSJsg8c6HWxkdjd5MNF"  # ID of the folder where files will be uploaded in Google Drive

# Function to authenticate with Google Drive API using a service account
def authenticate():
    creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return creds

# Function to upload a file to Google Drive
def upload_file(file_path):
    creds = authenticate()  # Get credentials
    service = build('drive', 'v3', credentials=creds)  # Build the Google Drive service
    file_metadata = {
        'name': os.path.basename(file_path),  # Get the filename from the file path
        'parents': [PARENT_FOLDER_ID]  # Set the parent folder in Google Drive
    }
    media = MediaFileUpload(file_path, mimetype='application/pdf')  # Set the file type as PDF for upload
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()  # Upload file and get file ID
    return file.get('id')  # Return the file ID after successful upload

# Function to download a file from Google Drive using the file ID
def download_file(file_id):
    creds = authenticate()  # Get credentials
    service = build('drive', 'v3', credentials=creds)  # Build the Google Drive service
    
    # Create a request to download the file
    request = service.files().get_media(fileId=file_id)
    file_data = io.BytesIO()  # Use BytesIO to handle the file in memory
    downloader = MediaIoBaseDownload(file_data, request)  # Download the file in chunks
    
    done = False
    while not done:  # Loop until the file download is complete
        status, done = downloader.next_chunk()
    
    file_data.seek(0)  # Move to the beginning of the file stream
    return file_data  # Return the in-memory file

# Initialize the Flask application
app = Flask(__name__)

# Set the OpenAI API key

# Database configuration
DATABASE_URL = "postgresql://StudySphere_owner:0mxFNCK2OTpP@ep-gentle-sound-a2sptgrr.eu-central-1.aws.neon.tech/StudySphere?sslmode=require"

# Set up SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)  # Connect to the PostgreSQL database
Session = sessionmaker(bind=engine)  # Create a session class
session = Session()  # Create a session instance

# Base class for models using SQLAlchemy's declarative system
Base = declarative_base()

# Define a model for storing PDF summaries
class Summary(Base):
    __tablename__ = 'summaries'  # Name of the table in the database
    id = Column(Integer, primary_key=True)  # Auto-incremented primary key
    filename = Column(String, nullable=False)  # Store the filename
    summary = Column(Text, nullable=False)  # Store the summary of the PDF content

# Create the summaries table if it doesn't exist
Base.metadata.create_all(engine)

# Define a token limit for OpenAI API (GPT-4 has a maximum token limit per request)
TOKEN_LIMIT = 7000

# Define the index route for the web application
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files['file']  # Get the uploaded file from the form
        if file:
            # Save file locally temporarily to upload to Google Drive
            pdf_file_path = os.path.join('uploads', file.filename)  # Save the file to an uploads directory
            file.save(pdf_file_path)  # Save the file locally

            # Upload file to Google Drive
            google_drive_file_id = upload_file(pdf_file_path)  # Upload the file and get the file ID

            # Delete the local file after upload
            os.remove(pdf_file_path)  # Remove the temporary file

            # Download the file from Google Drive for processing
            file_data = download_file(google_drive_file_id)  # Download the file from Google Drive

            # Use PyPDF2 to read the file from memory
            pdf_reader = PyPDF2.PdfReader(file_data)  # Read the PDF content
            total_tokens = 0  # Track the number of tokens in the file
            pdf_text = ""  # Store the combined text from all PDF pages

            # Extract text from each page of the PDF
            for page_num in range(len(pdf_reader.pages)):
                page_text = pdf_reader.pages[page_num].extract_text()  # Extract text from the current page
                total_tokens += len(page_text.split())  # Count the tokens in the page
                pdf_text += page_text.lower()  # Append text to the main text variable

            # Check token limit before sending the text to OpenAI API
            if total_tokens > TOKEN_LIMIT:
                return render_template('index.html', error="File is too large")  # Return an error if the file exceeds the limit

            # Call OpenAI API to summarize the extracted text
            response = openai.ChatCompletion.create(
                model="gpt-4",  # Use GPT-4 model
                messages=[
                    {"role": "system", "content": "You are a helpful research assistant."},
                    {"role": "user", "content": f"Summarize this: {pdf_text}"},  # Send the PDF text for summarization
                ],
            )

            summary = response["choices"][0]["message"]["content"]  # Get the summary from the API response

            # Save the summary to the database
            new_summary = Summary(filename=file.filename, summary=summary)  # Create a new summary object
            session.add(new_summary)  # Add it to the session
            session.commit()  # Commit the transaction to save it to the database

            # Render the page with the summary and Google Drive file ID
            return render_template('index.html', summary=summary, drive_file_id=google_drive_file_id)

    return render_template('index.html')  # If it's a GET request, just render the empty form

# Start the Flask application when the script is executed
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')  # Run the app with host 0.0.0.0 to be publicly accessible