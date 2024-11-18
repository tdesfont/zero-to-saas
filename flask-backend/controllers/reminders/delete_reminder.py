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


def delete_reminder(item):
    item = item["task"]
    # insert statement
    insert_stmt = sqlalchemy.text(
        "DELETE FROM reminder WHERE reminderId = :reminderid"
    )
    with pool.connect() as db_conn:
        # query database
        db_conn.execute(insert_stmt, parameters=item)
        # commit transaction
        db_conn.commit()
    return True