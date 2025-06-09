from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import joblib
from io import BytesIO
from PIL import Image
from skimage.feature import graycomatrix, graycoprops
import base64

app = FastAPI()

# === Middleware CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Load model dan encoder ===
model = joblib.load("model_rf.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# === Convert numpy image to base64 (untuk dikirim ke frontend) ===
def image_to_base64(img_array):
    _, buffer = cv2.imencode('.png', img_array)
    return base64.b64encode(buffer).decode('utf-8')

# === Endpoint Prediksi ===
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    image_np = np.array(image)

    steps = {}

    # Step 1: Resize
    resized = cv2.resize(image_np, (128, 128))

    # Step 2: Grayscale
    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
    steps["grayscale"] = image_to_base64(gray)

    # Step 3: Gaussian Blur
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    steps["blur"] = image_to_base64(blur)

    # Step 4: Histogram Equalization
    hist_eq = cv2.equalizeHist(blur)
    steps["hist_eq"] = image_to_base64(hist_eq)

    # Step 5: Contrast Stretching
    min_val, max_val = np.min(hist_eq), np.max(hist_eq)
    stretched = ((hist_eq - min_val) * (255.0 / (max_val - min_val))).astype(np.uint8)
    steps["contrast_stretch"] = image_to_base64(stretched)

    # Step 6: Threshold & Contour
    _, binary = cv2.threshold(stretched, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    steps["threshold"] = image_to_base64(binary)

    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contour_img = cv2.cvtColor(stretched.copy(), cv2.COLOR_GRAY2BGR)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        cv2.drawContours(contour_img, [largest], -1, (0, 255, 0), 2)
        area = cv2.contourArea(largest)
        perimeter = cv2.arcLength(largest, True)
    else:
        area = 0
        perimeter = 0
    steps["contour"] = image_to_base64(contour_img)

    # Step 7: Ekstraksi fitur
    glcm = graycomatrix(stretched, [1], [0], symmetric=True, normed=True)
    glcm_features = [
        graycoprops(glcm, 'contrast')[0, 0],
        graycoprops(glcm, 'dissimilarity')[0, 0],
        graycoprops(glcm, 'homogeneity')[0, 0],
        graycoprops(glcm, 'energy')[0, 0],
        graycoprops(glcm, 'correlation')[0, 0],
        graycoprops(glcm, 'ASM')[0, 0],
    ]

    # Tambahan fitur: Mean RGB dari gambar awal
    mean_rgb = np.mean(resized, axis=(0, 1))  # 3 nilai: R, G, B

    # Total fitur: 6 (GLCM) + 2 (Shape) + 3 (RGB) = 11
    final_features = np.array(glcm_features + [area, perimeter] + mean_rgb.tolist()).reshape(1, -1)

    # Prediksi
    prediction = model.predict(final_features)
    label = label_encoder.inverse_transform(prediction)[0]

    return {
        "prediction": label,
        "steps": steps  # base64 citra digital per langkah
    }
