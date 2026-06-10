import os
import tempfile
import io
from pathlib import Path


ALLOWED_EXTENSIONS = {'.pdf', '.docx', '.doc', '.txt'}


def extract_text_from_pdf(file_bytes: bytes) -> str:
    from PyPDF2 import PdfReader
    reader = PdfReader(io.BytesIO(file_bytes))
    pages = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages.append(text)
    return '\n\n'.join(pages)


def extract_text_from_docx(file_bytes: bytes) -> str:
    from docx import Document
    doc = Document(io.BytesIO(file_bytes))
    paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
    return '\n'.join(paragraphs)


def extract_text(file_bytes: bytes, filename: str) -> str:
    ext = Path(filename).suffix.lower()
    if ext == '.pdf':
        return extract_text_from_pdf(file_bytes)
    elif ext == '.docx':
        return extract_text_from_docx(file_bytes)
    elif ext == '.doc':
        raise ValueError(
            "Legacy .doc files are not supported. Please save as .docx or .txt and try again."
        )
    elif ext == '.txt':
        return file_bytes.decode('utf-8', errors='replace')
    else:
        raise ValueError(f"Unsupported file type: {ext}")
