import os
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

DATA_FILE = 'responses.json'

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.form.to_dict()
        file = request.files.get('photo')
        
        photo_filename = None
        if file:
            photo_filename = file.filename
            file.save(os.path.join(UPLOAD_FOLDER, photo_filename))
        
        entry = {
            "responses": data,
            "photo": photo_filename
        }
        
        existing_data = []
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as f:
                try:
                    existing_data = json.load(f)
                except:
                    existing_data = []
        
        existing_data.append(entry)
        
        with open(DATA_FILE, 'w') as f:
            json.dump(existing_data, f, indent=4)
            
        return jsonify({"status": "success", "message": "Submitted successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/view-secret-responses-2002', methods=['GET'])
def view_responses():
    try:
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({"message": "এখনো কোনো উত্তর জমা পড়েনি বা ফাইল তৈরি হয়নি।"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
