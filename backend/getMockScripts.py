import generateContent
import json
import os
import time

conv_topic = "Audio Engineering and Music"
scripts = [
    {"speaker_name": "Chip", "text": "Hi Aaliyah blah blah"},
    {"speaker_name": "Aaliyah", "text": "Hi Chip blah blah blah"},
]

for i in range(8):
    new_script = generateContent.generateContent(scripts, conv_topic)
    scripts.append(new_script)
    file_name = f'''mock_script{i}.json'''
    file_path = os.path.join('./mock_data./scripts',file_name)
    with open(file_path, 'w') as json_file:
        json.dump(new_script, json_file, indent=4)  # indent=4 makes the JSON more readable
    time.sleep(8)