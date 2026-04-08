from fastapi import FastAPI, Depends
from .auth import verify_api_key
from .schemas import DistillRequest, SOPDistilled
from .ai_service import distill_sop

app = FastAPI(
    title="ShadowSOP API",
    dependencies=[Depends(verify_api_key)]
)

@app.post("/api/v1/distill", response_model=SOPDistilled)
def distill_endpoint(request: DistillRequest):
    return distill_sop(request.source_text, request.context_hints)

@app.get("/health")
def health_check():
    return {"status": "ok"}

