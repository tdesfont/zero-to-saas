from __future__ import annotations

import logging
import sqlalchemy

from cloud_sql_db.connect_tcp import connect_tcp_socket

logger = logging.getLogger()


def init_connection_pool() -> sqlalchemy.engine.base.Engine:
    """Sets up connection pool for the app."""
    return connect_tcp_socket()


def create_thread(item):
    db = init_connection_pool()
    with db.connect() as conn:
        conn.execute(
            sqlalchemy.text(
                f"INSERT INTO threads (thread_id, title, tag) "
                f"VALUES ('{item['thread_id']}', '{item['title']}', '{item['tag']}');"
            )
        )
        conn.commit()
    return True
