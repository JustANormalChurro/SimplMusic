# SimplMusic

SimplMusic is a Spotify-like YouTube Music clone built with React and Python (Flask).

## Features
- **Home**: Browse top charts and recommendations.
- **Search**: Search for songs, videos, artists, and albums.
- **Player**: Stream audio directly from YouTube Music with a beautiful UI.
- **Queue**: Automatically fetches related songs when you play a track.
- **Blue Theme**: A sleek, dark-mode interface with blue accents.

## Tech Stack
- **Backend**: Python, Flask, `ytmusicapi`
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons

## Setup

### Prerequisites
- Python 3.10+
- Node.js 16+

### Installation

1. **Install Backend Dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. **Start the Backend**:
   ```bash
   python backend/app.py
   ```
   The API will run on `http://localhost:5000`.

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   The UI will be available at `http://localhost:5173`.

## Notes
- This application uses `ytmusicapi` to fetch data from YouTube Music.
- Playback relies on streaming URLs provided by YouTube.
- Some content might be region-restricted.

Enjoy SimplMusic!
