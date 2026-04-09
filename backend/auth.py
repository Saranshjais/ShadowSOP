from fastapi import Header, HTTPException, Depends
from sqlmodel import Session, select
from database import get_session
from models import Company

def verify_api_key(
    x_api_key: str = Header(...),
    db: Session = Depends(get_session)
):
    if x_api_key != "dev-test-key-123":
        raise HTTPException(status_code=403, detail="Invalid API Key")
    
    company = db.exec(select(Company)).first()
    if not company:
        company = Company(name="MVP Test Company")
        db.add(company)
        db.commit()
        db.refresh(company)
        
    return str(company.id)
