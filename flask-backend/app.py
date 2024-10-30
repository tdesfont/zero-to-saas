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
from controllers.tasks.create_task import create_task
from controllers.tasks.delete_task import delete_task
from controllers.tasks.get_tasks import retrieve_tasks
from controllers.threads.create_threads import create_thread
from controllers.threads.delete_thread import delete_thread
from controllers.threads.get_threads import retrieve_threads
from logic.today_tasks import retrieve_todays_tasks

app = Flask(__name__, static_folder='frontend-build', template_folder='frontend-build')
CORS(app)


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

@app.route('/api/today', methods=['GET'])
def get_today_route():
    items_list = retrieve_todays_tasks()
    return jsonify(items_list)

if __name__ == '__main__':
    # Set host to '0.0.0.0' to get the external url (* Running on http://192.168.1.112:5000)
    app.run(host='0.0.0.0', port=5000)
