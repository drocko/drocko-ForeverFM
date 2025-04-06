from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import threading
import time
import os
from getWavFileDuration import get_wav_duration


# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)

# Shared variables
conv_topic = "Initial Topic"
scripts = [] # [{speaker_name: '', text: ''}, ...] # Newest last
user_prompts = [] # [{user_name: '', text: ''}, ...] # Newest last
audio = [] # [{speaker_name: '', duration: '', text: '', filename: ''}] # Newest last

# Lock for thread safety
scripts_lock = threading.Lock()
audio_lock = threading.Lock()
conv_topic_lock = threading.Lock()
user_prompts_lock = threading.Lock()

# Thread functions
def continousMakeTranscript():
    while True:
        time.sleep(5)  # sim time taken for processing
        # Make a call to
        # new_script = generateContent()
        new_script = {'speaker_name': 'Chip', 'text': 'blah blah blah'}
        # here
        
        print(f"Generated script for {new_script['speaker_name']} saying: {new_script['text'][:20]}")
        
        with scripts_lock:
            scripts.append(new_script)
            if len(scripts) >= 10:
                scripts.pop(0)

        # Just to test:
        with user_prompts_lock:
            print(user_prompts)
        

def continousMakeAudio():
    while True:
        time.sleep(5)  # sim time taken for processing
        
        script = None
        with scripts_lock:
            if len(scripts) >= 1:
                script = scripts[0]
        
        if script:
            
            new_file_name = 'speech.wav' # For now
            #new_file_name = f"{script['speaker_name']}-{round(time.time() * 1000)}"
            

            # Make a call to
            # generateAudio(new_file_name)
            
            duration = get_wav_duration(new_file_name)
            new_audio_object = {
                'speaker_name': script['speaker_name'],
                'duration': duration,
                'text': script['text'],
                'filename': new_file_name
            }

            with audio_lock:
                audio.append(new_audio_object)
            
            print(f"Generated audio for {script['speaker_name']} duration: {round(duration, 2)} sec saved to: {new_file_name}")
        

def continousManageTopic():
    pass # for now
    # while True:
    #     time.sleep(5)  # Simulate time taken for processing
    #     with lock:
    #         if scripts:
    #             convTopic = f"Updated Topic based on: {scripts[-1]}"


# Start bg threads
thread1 = threading.Thread(target=continousMakeTranscript, daemon=True)
thread2 = threading.Thread(target=continousMakeAudio, daemon=True)
thread3 = threading.Thread(target=continousManageTopic, daemon=True)

thread1.start()
thread2.start()
thread3.start()

# Endpoints
@app.route('/chat-prompt', methods=['POST'])
def chat_prompt():
    user_input = request.json.get('user_prompt')
    
    if user_input:
        with user_prompts_lock:
            user_prompts.append(user_input)

    return jsonify({"message": "Prompt added to queue"}), 200

@app.route('/audio', methods=['GET'])
def get_audio():
    with audio_lock:
        if len(audio) >= 1:
            audio_filename = audio[0]  # remove the file from the queue
        else:
            return jsonify({"message": "No audio files available"}), 404

    audio_path = os.path.join("path/to/audio/files", audio_filename)
    if os.path.exists(audio_path):
        return send_file(audio_path, mimetype='audio/wav')
    else:
        return jsonify({"message": "Audio file not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
