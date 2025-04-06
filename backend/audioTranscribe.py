# backend/transcriber.py
import requests
import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/audio/transcriptions"

def transcribe_audio(file_path: str) -> str:
    try:
        with open(file_path, 'rb') as audio_file:
            response = requests.post(
                GROQ_API_URL,
                headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
                files={"file": audio_file},
                data={"model": "whisper-large-v3"}
            )
        if response.status_code == 200:
            return response.json()["text"]
        else:
            print("Groq transcription error:", response.text)
            return ""
    except Exception as e:
        print("Exception in transcription:", e)
        return ""