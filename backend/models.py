from typing import Optional
from uuid import UUID, uuid4
from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship

class Company(SQLModel, table=True):
    __tablename__ = "companies"
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    name: str
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

class SOP(SQLModel, table=True):
    __tablename__ = "sops"
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    company_id: Optional[UUID] = Field(foreign_key="companies.id")
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    raw_source_text: Optional[str] = None
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

class Step(SQLModel, table=True):
    __tablename__ = "steps"
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    sop_id: Optional[UUID] = Field(foreign_key="sops.id", ondelete="CASCADE")
    step_order: int
    action: str
    context_notes: Optional[str] = None

class EdgeCase(SQLModel, table=True):
    __tablename__ = "edge_cases"
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    sop_id: Optional[UUID] = Field(foreign_key="sops.id", ondelete="CASCADE")
    condition: str
    resolution: str
