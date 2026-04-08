from fastapi import FastAPI, Depends
from .auth import verify_api_key

app = FastAPI(
    title="ShadowSOP API",
    dependencies=[Depends(verify_api_key)]
)

@app.get("/health")
def health_check():
    return {"status": "ok"}
