from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List
import os

from auth import verify_api_key
from schemas import DistillRequest, SOPDistilled
from ai_service import distill_sop
from database import get_session
from models import SOP, Step, EdgeCase

app = FastAPI(
    title="ShadowSOP API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGINS", "*")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/distill", response_model=SOPDistilled)
def distill_endpoint(request: DistillRequest, company_id: str = Depends(verify_api_key)):
    return distill_sop(request.source_text, request.context_hints)

@app.post("/api/v1/sops")
def save_sop(
    payload: SOPDistilled, 
    company_id: str = Depends(verify_api_key), 
    db: Session = Depends(get_session)
):
    # 1. Create SOP Header
    new_sop = SOP(
        title=payload.title,
        description=payload.description,
        category=payload.category,
        company_id=company_id
    )
    db.add(new_sop)
    db.commit()
    db.refresh(new_sop)

    # 2. Insert Steps
    for step_data in payload.steps:
        db.add(Step(sop_id=new_sop.id, step_order=step_data.order, action=step_data.action, context_notes=step_data.context_notes))

    # 3. Insert Edge Cases
    for case_data in payload.edge_cases:
        db.add(EdgeCase(sop_id=new_sop.id, condition=case_data.condition, resolution=case_data.resolution))

    db.commit()
    return {"status": "success", "id": new_sop.id}

@app.get("/api/v1/sops")
def get_sops(
    company_id: str = Depends(verify_api_key), 
    db: Session = Depends(get_session)
):
    sops = db.exec(select(SOP).where(SOP.company_id == company_id)).all()
    return sops

@app.get("/health")
def health_check():
    return {"status": "ok"}
