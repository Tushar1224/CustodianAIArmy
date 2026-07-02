"""Test PDF document extraction and AI parsing."""
import os, sys, json, re
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

import pytest
from src.core.document_extractor import extract_text
from src.agents.agent_manager import AgentManager
from src.agents.base_agent import AgentMessage


@pytest.mark.asyncio
async def test_pdf_extraction():
    pdf_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "resources", "resumes", "Gen_AI_Developer_CV.pdf"
    )
    if not os.path.exists(pdf_path):
        pytest.skip(f"PDF not found: {pdf_path}")

    with open(pdf_path, 'rb') as f:
        contents = f.read()
    text = extract_text(contents, 'Gen_AI_Developer_CV.pdf')
    assert len(text) > 50, f"Extracted too little text: {len(text)} chars"

    agent_mgr = AgentManager()
    agent = agent_mgr.get_agent_by_name("TechnicalAI")
    if not agent:
        agent = agent_mgr.get_agent_by_name("CustodianAI")
    assert agent is not None, "No AI agent available"

    prompt = f"""You are an expert resume parser. Analyze the following raw resume text and extract all information into a structured JSON object.

Raw resume text:
{text}

Return ONLY valid JSON with this exact structure (use empty arrays/strings for missing fields):
{{
  "personal_info": {{"full_name": "", "email": "", "phone": "", "linkedin": "", "github": "", "website": "", "title": "", "summary": ""}},
  "education": [{{"id": 1, "degree": "", "institution": "", "field_of_study": "", "start_date": "", "end_date": "", "cgpa": "", "achievements": ""}}],
  "experience": [{{"id": 1, "company": "", "role": "", "location": "", "start_date": "", "end_date": "", "current": false, "description": "", "tech_stack": [], "achievements": []}}],
  "certifications": [{{"id": 1, "name": "", "issuer": "", "date": "", "url": ""}}],
  "skills": [{{"id": 1, "value": ""}}],
  "projects": [{{"id": 1, "name": "", "description": "", "tech_stack": [], "url": ""}}],
  "achievements": [{{"id": 1, "value": ""}}]
}}"""

    msg = AgentMessage(sender_id="api", receiver_id=agent.agent_id, content=prompt)
    result_msg = await agent.process_message(msg)
    result = result_msg.content

    result = result.strip()
    if result.startswith("```"):
        result = re.sub(r'^```(?:json)?\s*', '', result)
        result = re.sub(r'\s*```$', '', result)
    json_match = re.search(r'\{.*\}', result, re.DOTALL)
    parsed_data = json.loads(json_match.group() if json_match else result)

    assert "personal_info" in parsed_data
    assert "education" in parsed_data
    assert "experience" in parsed_data
    assert "skills" in parsed_data


@pytest.mark.asyncio
async def test_pdf_extraction_simple():
    """Test that PDF extraction works without hitting AI (skip if no key)."""
    pdf_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "resources", "resumes", "Gen_AI_Developer_CV.pdf"
    )
    if not os.path.exists(pdf_path):
        pytest.skip(f"PDF not found: {pdf_path}")

    with open(pdf_path, 'rb') as f:
        contents = f.read()
    text = extract_text(contents, 'Gen_AI_Developer_CV.pdf')
    assert len(text) > 50
