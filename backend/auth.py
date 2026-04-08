from fastapi import Header, HTTPException

async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != "dev-test-key-123":
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return x_api_key
