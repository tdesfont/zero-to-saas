import os
import psycopg2

from dotenv import load_dotenv
load_dotenv()

try:
    db_passsword = os.environ['DB_PASSWORD']
except Exception as e:
    raise KeyError("Key DB_PASSWORD is not set, please set it in .env file")


# Set up the PostGreSQL connection
def get_db_connection():
    conn = psycopg2.connect(
        host='127.0.0.1',
        database='postgres',
        user='postgres',
        password=db_passsword,
        port='5432'
    )
    return conn


def retrieve_events():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM events')
    events = cursor.fetchall()
    cursor.close()
    conn.close()

    # Convert the result to a list of dictionaries
    events_list = []
    for event in events:
        events_list.append({
            'eventid': event[0],
            'title': event[1],
            'description': event[2],
            'status': event[3],
            'starttimestamp': event[4],
            'endtimestamp': event[5]
        })
    return events_list
