from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
	CORSMiddleware, 
	allow_origins=["*"], 
	allow_methods=["*"], 
	allow_headers=["*"])

latest_data = {
    "weight": 1,
    "raw": 10
}

class SensorData(BaseModel):
    weight: float
    raw: float

@app.get("/")
def home():
    return {"message": "Server Running"}

@app.post("/data")
def receive_data(data: SensorData):
    global latest_data
    latest_data = data.dict()
    print("Received:", latest_data)
    return {"status": "success", "received": latest_data}

@app.get("/latest")
def get_latest():
    return latest_data
