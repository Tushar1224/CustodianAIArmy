import sys, json, asyncio, re
sys.path.insert(0, 'D:/CustodianAIArmy')
from src.core.document_extractor import extract_text
from src.agents.agent_manager import AgentManager
from src.agents.base_agent import AgentMessage

async def test():
    pdf_path = 'D:/CustodianAIArmy/resources/resumes/Gen_AI_Developer_CV.pdf'
    with open(pdf_path, 'rb') as f:
        contents = f.read()
    text = extract_text(contents, 'Gen_AI_Developer_CV.pdf')
    print(f"Extracted {len(text)} chars from PDF")
    print("=== Text preview ===")
    print(text[:400])
    print("=== End preview ===")

    agent_mgr = AgentManager()
    agent = agent_mgr.get_agent_by_name("TechnicalAI")
    if not agent:
        agent = agent_mgr.get_agent_by_name("CustodianAI")

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

    json_match = re.search(r'\{.*\}', result, re.DOTALL)
    if json_match:
        parsed_data = json.loads(json_match.group())
    else:
        parsed_data = json.loads(result)

    print("\n=== Parsed Resume JSON ===")
    print(json.dumps(parsed_data, indent=2, ensure_ascii=False))

asyncio.run(test())
