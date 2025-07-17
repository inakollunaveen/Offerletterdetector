from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.hel import get_verdict
from utils.pdfs import extract_text
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

# File upload path
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Save file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        print(f"✅ File saved at: {file_path}")

        # Extract text
        text = extract_text(file_path)
        if not text or text.strip() == "":
            print("❌ No text extracted from PDF.")
            return jsonify({'error': 'No text extracted from PDF. Possibly scanned or empty.'}), 400

        # Analyze
        verdict, issues = get_verdict(text)
        print(f"✅ Verdict: {verdict}")
        print(f"📝 Issues: {issues}")

        return jsonify({
            'verdict': verdict,
            'issues': issues
        })

    except Exception as e:
        print(f"❌ Internal server error: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/')
def index():
    return "✅ Backend is running (AI + Rule-Based Fake Offer Letter Detector)."

if __name__ == '__main__':
    app.run(debug=True)
