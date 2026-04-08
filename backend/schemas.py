from pydantic import BaseModel
from typing import List, Optional

class SOPStep(BaseModel):
    order: int
    action: str
    context_notes: Optional[str] = None

class SOPEdgeCase(BaseModel):
    condition: str
    resolution: str

class SOPDistilled(BaseModel):
    title: str
    description: str
    category: str
    steps: List[SOPStep]
    edge_cases: List[SOPEdgeCase]
    missing_info_queries: List[str]

class DistillRequest(BaseModel):
    source_text: str
    context_hints: Optional[str] = None
