"""
Logging configuration for Custodian AI Army
"""

import logging
import sys
from typing import Dict, Any


import io

def _utf8_stream():
    """Return stdout wrapped in a UTF-8 encoder to prevent UnicodeEncodeError."""
    if hasattr(sys.stdout, "encoding") and sys.stdout.encoding and sys.stdout.encoding.upper() not in ("UTF-8", "UTF-16LE"):
        return io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    return sys.stdout


def setup_logging(log_level: str = "INFO") -> None:
    """Setup logging configuration"""
    
    # Create formatter
    formatter = logging.Formatter(
        fmt="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    
    # Create console handler with UTF-8 encoding
    console_handler = logging.StreamHandler(_utf8_stream())
    console_handler.setFormatter(formatter)
    
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(getattr(logging, log_level.upper()))
    root_logger.addHandler(console_handler)
    
    # Configure specific loggers
    loggers = [
        "custodian_ai",
        "uvicorn.access",
        "uvicorn.error"
    ]
    
    for logger_name in loggers:
        logger = logging.getLogger(logger_name)
        logger.setLevel(getattr(logging, log_level.upper()))


def get_logger(name: str) -> logging.Logger:
    """Get a logger instance"""
    return logging.getLogger(f"custodian_ai.{name}")