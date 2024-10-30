from google.cloud.sql.connector import Connector
import sqlalchemy
import os

from dotenv import load_dotenv

load_dotenv()

# initialize Connector object
connector = Connector()

try:
    db_passsword = os.environ['DB_PASSWORD']
except Exception as e:
    raise KeyError("Key DB_PASSWORD is not set, please set it in .env file")


# function to return the database connection
def getconn():
    conn = connector.connect(
        "forward-emitter-427016-s9:us-central1:realtimeselforganizingagendadb",
        "pg8000",
        user="postgres",
        db="postgres",
        password=db_passsword,
    )
    return conn


# create connection pool
pool = sqlalchemy.create_engine(
    "postgresql+pg8000://",
    creator=getconn,
)


def retrieve_recurringtask():
    with pool.connect() as db_conn:
        # Query database
        result = db_conn.execute(sqlalchemy.text("SELECT * from recurringtask")).fetchall()
        columns = [
            'recurring_task_id', 'thread_id', 'title', 'description', 'frequency', 'start_date',
            'target_date', 'priority', 'muted', 'archived'
        ]
        items_list = []
        for item in result:
            items_list.append({columns[i]: item[i] for i in range(len(item))})
        return items_list
