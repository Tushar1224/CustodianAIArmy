"""
Pydantic-based output validator for agent responses.
Validates code block completeness, JSON structure, and response integrity.
"""

import re
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator


class CodeBlock(BaseModel):
    language: Optional[str] = None
    content: str
    is_complete: bool = True
    line_count: int = 0


class AgentOutput(BaseModel):
    content: str
    code_blocks: List[CodeBlock] = Field(default_factory=list)
    has_incomplete_code: bool = False
    warnings: List[str] = Field(default_factory=list)

    @field_validator('content')
    @classmethod
    def ensure_complete_code_blocks(cls, v: str) -> str:
        warnings = []
        backtick_positions = [m.start() for m in re.finditer(r'```', v)]

        if len(backtick_positions) % 2 != 0:
            warnings.append(
                "The response contains an incomplete code block "
                "(unmatched triple backticks). "
                "Please check the output above."
            )
            v = v.rstrip() + (
                "\n\n> ⚠️ **Warning:** The code block above appears incomplete. "
                "Please regenerate or check for missing lines."
            )

        return v


def extract_code_blocks(text: str) -> List[CodeBlock]:
    blocks = []
    pattern = r'```([a-zA-Z0-9+#_.-]*)\n([\s\S]*?)```'
    for match in re.finditer(pattern, text):
        lang = match.group(1) or None
        content = match.group(2)
        blocks.append(CodeBlock(
            language=lang,
            content=content,
            is_complete=True,
            line_count=len(content.splitlines())
        ))
    return blocks


def validate_and_format_output(text: str) -> str:
    output = AgentOutput(content=text)
    raw = text

    extracted = extract_code_blocks(raw)
    output.code_blocks = extracted

    backtick_count = raw.count('```')
    if backtick_count % 2 != 0:
        output.has_incomplete_code = True
        output.warnings.append(
            "Unmatched triple backticks detected."
        )

    if '"""' in raw and raw.count('"""') % 2 != 0:
        output.has_incomplete_code = True
        output.warnings.append(
            "Unterminated triple-quoted string (\"\"\") detected in output."
        )

    curly_brace_blocks = re.findall(r'\{[^{}]*\}', raw)
    for block in curly_brace_blocks:
        try:
            import json
            json.loads(block)
        except (json.JSONDecodeError, ValueError):
            if len(block) > 50:
                output.warnings.append(
                    "A JSON-like block could not be parsed. "
                    "Please verify the format."
                )

    if output.has_incomplete_code:
        warning_text = "\n\n> ⚠️ **Warning:** " + " | ".join(output.warnings)
        if warning_text not in raw:
            raw = raw.rstrip() + warning_text

    return raw


def format_code_blocks(text: str) -> str:
    if '```' in text:
        code_blocks = [m for m in re.finditer(r'```[a-zA-Z]*\n[\s\S]*?```', text)]
        if not code_blocks:
            return text + (
                "\n\n⚠️ Warning: The code block above appears incomplete. "
                "Please regenerate or check for missing lines."
            )
        return text

    if re.search(r"def |class |import |print\(", text):
        if text.count('"""') % 2 != 0:
            return (
                f"```python\n{text}\n```\n\n"
                "⚠️ Warning: The code block above contains "
                "an unterminated triple-quoted string."
            )
        return f"```python\n{text}\n```"

    if text.strip().startswith('{') and text.strip().endswith('}'):
        return f"```json\n{text}\n```"

    if re.search(r"<\w+>|SELECT |INSERT |UPDATE |DELETE ", text):
        return f"```\n{text}\n```"

    return text
