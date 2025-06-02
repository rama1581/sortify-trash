from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load model dan data latih-uji untuk ambil skor
model = joblib.load("model.pkl")
# Optional: Simpan nilai akurasi saat training ke file terpisah atau langsung hardcoded
accuracy = 0.72 # Ganti sesuai nilai dari training

def extract_features(image):
    img = Image.open(image).resize((64, 64)).convert("RGB")
    return np.array(img).flatten().reshape(1, -1)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    features = extract_features(file)
    prediction = model.predict(features)[0]

    return jsonify({
        "result": prediction,
        "accuracy": round(accuracy * 100, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)
