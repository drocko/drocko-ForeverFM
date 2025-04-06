import groqAudio
import json
import os
import time

for i in range(8):
    with open(f'mock_data/scripts/mock_script{i}.json', 'r') as f:
        data: dict = json.load(f)
        # print(script['text'])
        groqAudio.createAudio(text=data["text"],voice=f"{data["speaker_name"]}-PlayAI",file_path=f"mock_data/audio/mock_audio{i}.wav")
        f.close()
    # groqAudio.createAudio("",'Chip-PlayAI',f'''mock_data/audio/out{i}.wav''')
    time.sleep(15)