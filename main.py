from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import json
import base64
import os

app = FastAPI()

# Uploads ফোল্ডার তৈরি
os.makedirs("uploads", exist_ok=True)

# ওয়েবসাইট লোড করার রুট
@app.get("/")
def read_root():
    return FileResponse("index.html")

# CSS ফাইল লোড করার জন্য
@app.get("/style.css")
def get_css():
    return FileResponse("style.css")

# JS ফাইল লোড করার জন্য
@app.get("/script.js")
def get_js():
    return FileResponse("script.js")

# উত্তর ও ফটো সেভ করার API Endpoint
@app.post("/api/submit")
async def submit_answers(request: Request):
    data = await request.json()
    
    # ১. সব টেক্সট উত্তর responses.json ফাইলে সেভ হবে
    with open("responses.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        
    # ২. সব ছবি uploads ফোল্ডারে ইমেজ ফাইল হিসেবে সেভ হবে
    photos = data.get("photos", {})
    for q_num, img_base64 in photos.items():
        if img_base64.startswith("data:image"):
            header, encoded = img_base64.split(",", 1)
            file_data = base64.b64decode(encoded)
            file_path = f"uploads/question_{q_num}.png"
            with open(file_path, "wb") as f:
                f.write(file_data)
                
    return {"message": "Success"}
