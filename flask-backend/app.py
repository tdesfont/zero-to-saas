from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# Define a route to fetch events
@app.route('/events', methods=['GET'])
def get_events():
    events_list = [{"title": "Develop React Native component"}]
    return jsonify(events_list)

@app.route('/create_event', methods=['POST'])
def create_event():
    event = request.json
    return jsonify({'message': 'Event creation request received', 'event': event}), 200

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'Ping succeeded'}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
