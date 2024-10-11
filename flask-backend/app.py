from flask import Flask, request, jsonify
from flask_cors import CORS
from controllers.events.get_events import retrieve_events
from controllers.events.create_event import create_event


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# Define a route to fetch events
@app.route('/events', methods=['GET'])
def get_events_route():
    events_list = retrieve_events()
    return jsonify(events_list)

@app.route('/create_event', methods=['POST'])
def create_event_route():
    event = request.json
    create_event(event)
    return jsonify({'message': 'Event creation request received'}), 200

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'Ping succeeded'}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
