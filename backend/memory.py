# memory.py

import os

SCRIPT_HISTORY_FILE = "script_history.txt"

def append_to_history(text: str):
    with open(SCRIPT_HISTORY_FILE, "a") as f:
        f.write(text + "\n---\n")

def get_history_text():
    if not os.path.exists(SCRIPT_HISTORY_FILE):
        return ""
    with open(SCRIPT_HISTORY_FILE, "r") as f:
        return f.read()
