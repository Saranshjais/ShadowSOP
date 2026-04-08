import os
from dotenv import load_dotenv
from google import genai
from .schemas import SOPDistilled

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

def distill_sop(source_text: str, context_hints: str = None) -> SOPDistilled:
    system_instruction = (
        "You are a Senior Systems Architect. Analyze the following unstructured communication. "
        "Identify the primary objective and decompose it into a high-density, step-by-step SOP. "
        "If you encounter ambiguity (e.g., 'the server' without specifying which one), flag it "
        "in the 'missing_info_queries' field. Your output must be strictly valid JSON according "
        "to the provided schema."
    )
    
    prompt = f"Source Text: {source_text}\n"
    if context_hints:
        prompt += f"Context Hints: {context_hints}\n"
        
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
        config=genai.types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json",
            response_schema=SOPDistilled,
        ),
    )
    
    return SOPDistilled.model_validate_json(response.text)
