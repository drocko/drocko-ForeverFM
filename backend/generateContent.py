import os
import requests
from dotenv import load_dotenv
load_dotenv()

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def format_script_history(scripts):
    formatted = ""
    for turn in scripts:
        formatted += f"{turn['speaker_name']}: {turn['text']}\n"
    return formatted.strip()

def generateContent(scripts, conv_topic):
    history = format_script_history(scripts)
    prompt = f"""
You are helping write an ongoing podcast about **{conv_topic}**.

Here is the previous script so far:
{history}

Continue the podcast with the next speaker's turn. Keep the tone natural, insightful, and conversational. Be creative, stay on topic, and make the transition smooth. Use only one speaker for this turn.
"""

    response = requests.post(
        GROQ_API_URL,
        headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
        json={
            "model": "llama-3.3-70b-versatile",  # adjust if needed
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.7
        }
    )

    try:
        json_data = response.json()
        print("Groq Response JSON:", json_data)  # Debug print

        message = json_data['choices'][0]['message']['content']
        lines = message.strip().split("\n", 1)
        if len(lines) == 2 and ":" in lines[0]:
            speaker, text = lines[0].split(":", 1)
            return {"speaker_name": speaker.strip(), "text": text.strip()}
        else:
            return {"speaker_name": "AI Narrator", "text": message.strip()}
    except Exception as e:
        print("Error parsing Groq response:", e)
        print("Raw response text:", response.text)
        return {"speaker_name": "System", "text": "Error generating script."}
    
'''conv_topic = "AI Models and Life"
scripts = [
    {"speaker_name": "Bob", "text": "Hi Bob blah blah"},
    {"speaker_name": "Alice", "text": "Hi Alice blah blah blah"},
]

new_script = generateContent(scripts, conv_topic)
print(new_script)'''
