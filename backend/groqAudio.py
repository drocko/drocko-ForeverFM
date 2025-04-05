import os
from groq import Groq
from dotenv import load_dotenv
load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def createAudio(text:str="",voice:str="Aaliyah-PlayAI",file_path:str="audio/out.wav") -> None:
    speech_file_path = file_path
    model = "playai-tts"
    voice = voice
    response_format = "wav"

    response = client.audio.speech.create(
        model=model,
        voice=voice,
        input=text,
        response_format=response_format
    )

    response.write_to_file(speech_file_path)

createAudio("Hey what's up gang!")