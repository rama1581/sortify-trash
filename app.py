from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import pickle
from io import BytesIO
from PIL import Image
from skimage.feature import graycomatrix, graycoprops

# Inisialisasi FastAPI
app = FastAPI()

# Middleware CORS agar frontend bisa akses API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model Random Forest dan Label Encoder
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

with open("label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

# Fungsi ekstraksi fitur dari gambar
def preprocess_and_extract_features(image: np.ndarray) -> np.ndarray:
    image = cv2.resize(image, (128, 128))
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    hist_eq = cv2.equalizeHist(blur)

    # Contrast Stretching
    min_val = np.min(hist_eq)
    max_val = np.max(hist_eq)
    stretched = ((hist_eq - min_val) * (255.0 / (max_val - min_val))).astype(np.uint8)

    # GLCM Features
    glcm = graycomatrix(stretched, [1], [0], symmetric=True, normed=True)
    glcm_features = [
        graycoprops(glcm, 'contrast')[0, 0],
        graycoprops(glcm, 'dissimilarity')[0, 0],
        graycoprops(glcm, 'homogeneity')[0, 0],
        graycoprops(glcm, 'energy')[0, 0],
        graycoprops(glcm, 'correlation')[0, 0],
        graycoprops(glcm, 'ASM')[0, 0]
    ]

    # Shape Features
    _, binary = cv2.threshold(stretched, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if contours:
        largest_contour = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(largest_contour)
        perimeter = cv2.arcLength(largest_contour, True)
    else:
        area = 0
        perimeter = 0

    return np.array(glcm_features + [area, perimeter])

# Endpoint prediksi gambar
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    image_np = np.array(image)

    features = preprocess_and_extract_features(image_np).reshape(1, -1)
    prediction = model.predict(features)
    label = label_encoder.inverse_transform(prediction)[0]

    return {"prediction": label}
