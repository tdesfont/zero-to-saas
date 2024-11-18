from dotenv import load_dotenv

from ai_interactions.generic_audio_recording_gateway import process_user_audio_gateway, execute_llm_action_gateway
from controllers.reminders.get_reminders import retrieve_reminders
from rag_llm.ask_timeout import process_timeout_query

load_dotenv()  # take environment variables from .env.

import speech_recognition as sr
from pydub import AudioSegment

from dotenv import load_dotenv

load_dotenv()

from openai import OpenAI

from flask import Flask, request, jsonify, send_from_directory
from controllers.events.get_events import retrieve_events
from controllers.events.create_event import create_event
from controllers.events.delete_event import delete_event
from flask_cors import CORS

import os

from controllers.recurringtask.get_recurringtask import retrieve_recurringtask
from controllers.routinesubtasks.create_routinesubtasks import create_routinesubtasks
from controllers.routinesubtasks.delete_routinesubtasks import delete_routinesubtasks
from controllers.routinesubtasks.get_routinesubtasks import retrieve_routinesubtasks
from controllers.tasks.create_task import create_task, logger
from controllers.tasks.delete_task import delete_task
from controllers.tasks.get_tasks import retrieve_tasks
from controllers.threads.create_threads import create_thread
from controllers.threads.delete_thread import delete_thread
from controllers.threads.get_threads import retrieve_threads
from logic.today_tasks import retrieve_todays_tasks, retrieve_todays_tasks_summary

print("Starting Flask server ...")
app = Flask(__name__, static_folder='frontend-build', template_folder='frontend-build')
CORS(app)

from google.cloud import storage


def download_blob(bucket_name, source_blob_name, destination_file_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)


print("Downloading embeddings from Google Cloud Storage ...")
download_blob(
    bucket_name="time-out-embeddings",
    source_blob_name="rag_embeddings.csv",
    destination_file_name="rag_embeddings.csv")
print("Downloaded embeddings from Google Cloud Storage.")

import pandas as pd

print("Loading embeddings CSV file ...")
RAG_EMBEDDINGS = pd.read_csv("rag_embeddings.csv")
print("Loaded embeddings CSV file")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'Ping succeeded'}), 200


## Events

# Define a route to fetch events
@app.route('/api/events', methods=['GET'])
def get_events_route():
    events_list = retrieve_events()
    return jsonify(events_list)


@app.route('/api/create_event', methods=['POST'])
def create_event_route():
    event = request.json
    create_event(event)
    return jsonify({'message': 'Event creation request received'}), 200


@app.route('/api/delete_event', methods=['POST'])
def delete_event_route():
    event = request.json
    delete_event(event)
    return jsonify({'message': 'Event deletion request received'}), 200


## Routine Sub Tasks

# Define a route to fetch tasks
@app.route('/api/routinesubtasks', methods=['GET'])
def get_routinesubtasks_route():
    items_list = retrieve_routinesubtasks()
    return jsonify(items_list)


@app.route('/api/create_routinesubtasks', methods=['POST'])
def create_routinesubtasks_route():
    item = request.json
    create_routinesubtasks(item)
    return jsonify({'message': 'RoutineSubTask creation request received'}), 200


@app.route('/api/delete_routinesubtasks', methods=['POST'])
def delete_routinesubtasks_route():
    item = request.json
    delete_routinesubtasks(item)
    return jsonify({'message': 'RoutineSubTask deletion request received'}), 200


## Tasks

# Define a route to fetch tasks
@app.route('/api/tasks', methods=['GET'])
def get_tasks_route():
    items_list = retrieve_tasks()
    return jsonify(items_list)


@app.route('/api/create_task', methods=['POST'])
def create_task_route():
    item = request.json
    create_task(item)
    return jsonify({'message': 'Task creation request received'}), 200


@app.route('/api/delete_task', methods=['POST'])
def delete_task_route():
    item = request.json
    delete_task(item)
    return jsonify({'message': 'Task deletion request received'}), 200


## Threads

# Define a route to fetch threads
@app.route('/api/threads', methods=['GET'])
def get_threads_route():
    items_list = retrieve_threads()
    return jsonify(items_list)


@app.route('/api/create_thread', methods=['POST'])
def create_thread_route():
    item = request.json
    create_thread(item)
    return jsonify({'message': 'Thread creation request received'}), 200


@app.route('/api/delete_thread', methods=['POST'])
def delete_thread_route():
    item = request.json
    delete_thread(item)
    return jsonify({'message': 'Thread deletion request received'}), 200


# Recurring Tasks

# Define a route to get recurringtask
@app.route('/api/get_recurringtask', methods=['GET'])
def get_recurringtask_route():
    items_list = retrieve_recurringtask()
    return jsonify(items_list)


# Reminders
@app.route('/api/get_reminders', methods=['GET'])
def get_reminders_route():
    items_list = retrieve_reminders()
    return jsonify(items_list)


@app.route('/api/today', methods=['GET'])
def get_today_route():
    items_list = retrieve_todays_tasks()
    return jsonify(items_list)


@app.route('/api/today_summary', methods=['GET'])
def get_today_summary_route():
    openai_api_key = os.environ.get("OPENAI_API_KEY")
    summary = retrieve_todays_tasks_summary(openai_api_key=openai_api_key)
    return jsonify(summary)


@app.route('/api/upload_audio', methods=['POST'])
def upload_audio():
    """
        Handle generic voice interactions at the level of the server. This should not
        target a specific endpoint but instead return always an acknowledgment and a response in the dialog.
    :return:
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # The file received is actually
    # file my_audio_file.wav
    # my_audio_file.wav: ISO Media, MPEG v4 system, 3GPP
    TMP_FILE_NAME = "my_audio_file.wav"
    TMP_CONVERTED_FILE_NAME = "converted_audio.wav"
    file.save(TMP_FILE_NAME)

    # Load the media file (3GP, MP4, etc.)
    audio = AudioSegment.from_file(TMP_FILE_NAME)  # or .3gp or other supported format
    # Export it as WAV
    audio.export(TMP_CONVERTED_FILE_NAME, format="wav")

    try:
        client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
        audio_file = open(TMP_CONVERTED_FILE_NAME, "rb")
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )
        llm_suggested_actions = process_user_audio_gateway(transcription.text, client)
        return jsonify({'message': 'Sound received', 'text': transcription.text, 'answer': llm_suggested_actions}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'message': 'Failed to parse audio, content is not readable.'}), 400


@app.route('/api/actions', methods=['POST'])
def trigger_suggested_actions():
    """
        Trigger actions suggested by LLMs
    """
    inferred_action = request.json
    execute_llm_action_gateway(inferred_action)
    return jsonify({'message': 'Received acknowledged suggested actions'}), 200


@app.route('/api/timeout-chat', methods=['POST'])
def chat_with_timeout():
    """
        Send a question to timeout:

        curl --header "Content-Type: application/json" --data '{"query": "Je veux aller voir une exposition de peinture (idealement moderne), as-tu des suggestions de musee."}' -X POST http://192.168.5.8:5000/api/timeout-chat

    """
    query = request.json.get('query')
    answer, sources = process_timeout_query(query, RAG_EMBEDDINGS)
    return jsonify({'answer': answer, 'sources': sources}), 200


if __name__ == '__main__':
    # Set host to '0.0.0.0' to get the external url (* Running on http://192.168.1.112:5000)
    app.run(host='0.0.0.0', port=5000)
