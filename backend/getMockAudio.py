import groqAudio
import json
import os
import time

for i in range(8):
    script = json.load(f'''mock_data/scripts/mock_script{i}.json''')
    print(script)
    # groqAudio.createAudio("",'Chip-PlayAI',f'''mock_data/audio/out{i}.wav''')
    time.sleep(8)