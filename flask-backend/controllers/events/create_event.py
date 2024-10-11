from __future__ import annotations

import logging
import sqlalchemy

from cloud_sql_db.connect_tcp import connect_tcp_socket

logger = logging.getLogger()


def init_connection_pool() -> sqlalchemy.engine.base.Engine:
    """Sets up connection pool for the app."""
    return connect_tcp_socket()


def create_event(event):
    db = init_connection_pool()
    with db.connect() as conn:
        conn.execute(
            sqlalchemy.text(
                f"INSERT INTO events (eventId, title, description, status, startTimestamp, endTimestamp) VALUES ('{event['eventid']}', '{event['title']}', '{event['description']}', '{event['status']}', '{event['starttimestamp']}', '{event['endtimestamp']}');"
            )
        )
        conn.commit()
    return True
