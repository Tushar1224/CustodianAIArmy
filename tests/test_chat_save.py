"""Test saving a chat session to the active database."""
import os
from dotenv import load_dotenv
load_dotenv()
from src.core.database import save_chat_session, get_chats_for_user

chat_id = save_chat_session({
    "id": "test-123",
    "user_email": "test@example.com",
    "title": "Test Chat",
    "messages": [{"role": "user", "content": "hello"}]
})
print(f"Saved chat: {chat_id}")

chats = get_chats_for_user("test@example.com")
print(f"Found {len(chats)} chats")
for c in chats:
    print(f"  - {c['id']}: {c['title']}")
