from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(title="PocketSmart AI Engine")

# CORS Policy configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

history_ledger = []

class HomeDecorInput(BaseModel):
    total_budget: float
    num_lights: int
    num_fans: int
    num_furniture: int
    additional_requirements: Optional[str] = None

class PartyInput(BaseModel):
    event_type: str
    total_budget: float
    guest_count: int
    additional_requirements: Optional[str] = None

@app.post("/generate-home")
def generate_home(data: HomeDecorInput):
    recommendation = {
        "status": "success",
        "domain": "Home Decor",
        "data": {
            "budget_breakdown": [
                {
                    "category": "Lighting & Fans",
                    "allocated_amount": data.total_budget * 0.2,
                    "items": [{"name": "Smart LED & Ceiling Fans", "shopping_links": ["amazon", "flipkart"]}]
                },
                {
                    "category": "Furniture Setup",
                    "allocated_amount": data.total_budget * 0.8,
                    "items": [{"name": "Scandinavian Sofa Set", "shopping_links": ["ikea", "amazon"]}]
                }
            ]
        }
    }
    history_ledger.append({"domain": "Home Decor", "budget": data.total_budget, "details": data.additional_requirements})
    return recommendation

@app.post("/generate-party")
def generate_party(data: PartyInput):
    recommendation = {
        "status": "success",
        "domain": "Party Package",
        "data": {
            "categories": [
                {"name": "Catering (Swiggy/Zomato)", "budget": data.total_budget * 0.5},
                {"name": "Venue & Decor", "budget": data.total_budget * 0.5}
            ]
        }
    }
    history_ledger.append({"domain": "Party", "budget": data.total_budget, "details": data.event_type})
    return recommendation

@app.post("/generate-jewelry")
def generate_jewelry(budget: str = Form(...), requirements: str = Form(...)):
    recommendation = {
        "status": "success",
        "domain": "Jewelry Stylist",
        "recommendation_summary": [
            f"Suggested Antique Gold set matching requirements within ₹{budget}"
        ]
    }
    history_ledger.append({"domain": "Jewelry", "budget": budget, "details": requirements})
    return recommendation

@app.get("/history/api")
def get_history():
    return {"status": "success", "history": history_ledger}
