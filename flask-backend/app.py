from flask import Flask, request, jsonify, send_from_directory
from controllers.events.get_events_wo_cloud_proxy import retrieve_events
from controllers.events.create_event_wo_cloud_proxy import create_event
import os

app = Flask(__name__, static_folder='frontend-build', template_folder='frontend-build')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


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

@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'Ping succeeded'}), 200


if __name__ == '__main__':
    app.run()
