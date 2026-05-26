# Uploader App

Python-based folder monitor that automatically uploads photos to the backend.

## Setup

1. Install Python 3.8+
2. Install watchdog: `pip install watchdog requests`
3. Configure `.env` with backend URL and auth token
4. Run uploader: `python main.py`

## Features

- Monitors a local folder for new images
- Auto-uploads JPG/PNG files
- Retry logic for failed uploads
- File move to "uploaded" folder after success
- Logging and error notifications
