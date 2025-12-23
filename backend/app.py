from flask import Flask, jsonify, request
from flask_cors import CORS
from ytmusicapi import YTMusic
import os

app = Flask(__name__)
CORS(app)

# Initialize YTMusic
# We try to use unauthenticated first as per docs for public features
yt = YTMusic()

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q')
    filter_type = request.args.get('filter')
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    try:
        results = yt.search(query, filter=filter_type)
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/home', methods=['GET'])
def home():
    try:
        # get_home works unauthenticated but might be limited
        results = yt.get_home(limit=3)
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/song/<video_id>', methods=['GET'])
def get_song(video_id):
    try:
        result = yt.get_song(video_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/artist/<channel_id>', methods=['GET'])
def get_artist(channel_id):
    try:
        result = yt.get_artist(channel_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/album/<browse_id>', methods=['GET'])
def get_album(browse_id):
    try:
        result = yt.get_album(browse_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/watch', methods=['GET'])
def get_watch_playlist():
    video_id = request.args.get('videoId')
    playlist_id = request.args.get('playlistId')

    if not video_id and not playlist_id:
        return jsonify({'error': 'Missing videoId or playlistId'}), 400

    try:
        result = yt.get_watch_playlist(videoId=video_id, playlistId=playlist_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/lyrics/<browse_id>', methods=['GET'])
def get_lyrics(browse_id):
    try:
        result = yt.get_lyrics(browse_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/charts', methods=['GET'])
def get_charts():
    country = request.args.get('country', 'ZZ')
    try:
        result = yt.get_charts(country=country)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
