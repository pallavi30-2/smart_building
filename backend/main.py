from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Smart Building Platform API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Smart Building Platform API is running", "docs": "/docs"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "building-api"}


@app.get("/api/overview")
def overview() -> dict:
    return {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "energy_today_kwh": 2840,
        "energy_target_kwh": 3200,
        "occupancy": 68,
        "active_alerts": 3,
        "zones": [
            {"name": "North Tower", "status": "optimal", "temperature": 21.4},
            {"name": "Atrium", "status": "attention", "temperature": 23.1},
            {"name": "South Wing", "status": "optimal", "temperature": 20.8},
        ],
    }
