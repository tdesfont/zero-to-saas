"""
    Reference: https://github.com/GoogleCloudPlatform/python-docs-samples/blob/main/cloud-sql/postgres/sqlalchemy/app.py
"""

import os
import sqlalchemy

from dotenv import load_dotenv

load_dotenv()

try:
    db_passsword = os.environ['DB_PASSWORD']
except Exception as e:
    raise KeyError("Key DB_PASSWORD is not set, please set it in .env file")


def connect_tcp_socket() -> sqlalchemy.engine.base.Engine:
    db_host = '127.0.0.1'
    db_user = 'postgres'
    db_pass = db_passsword
    db_name = 'postgres'
    db_port = 5432

    connect_args = {}

    pool = sqlalchemy.create_engine(
        # Equivalent URL:
        # postgresql+pg8000://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name>
        sqlalchemy.engine.url.URL.create(
            drivername="postgresql+pg8000",
            username=db_user,
            password=db_pass,
            host=db_host,
            port=db_port,
            database=db_name,
        ),
        connect_args=connect_args,
        # Pool size is the maximum number of permanent connections to keep.
        pool_size=4,
        # Temporarily exceeds the set pool_size if no connections are available.
        max_overflow=2,
        # The total number of concurrent connections for your application will be
        # a total of pool_size and max_overflow.
        # SQLAlchemy automatically uses delays between failed connection attempts,
        # but provides no arguments for configuration.
        # 'pool_timeout' is the maximum number of seconds to wait when retrieving a
        # new connection from the pool. After the specified amount of time, an
        # exception will be thrown.
        pool_timeout=30,  # 30 seconds
        # Connections that live longer than the specified amount of time will be
        # re-established
        pool_recycle=1800,  # 30 minutes
    )
    return pool
