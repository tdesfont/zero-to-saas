from __future__ import annotations

import logging
import sqlalchemy

from cloud_sql_db.connect_tcp import connect_tcp_socket

logger = logging.getLogger()


def init_connection_pool() -> sqlalchemy.engine.base.Engine:
    """Sets up connection pool for the app."""
    return connect_tcp_socket()


def create_task(task):
    db = init_connection_pool()
    with db.connect() as conn:
        conn.execute(
            sqlalchemy.text(
                f"INSERT INTO tasks (task_id, title, tag, thread_id, created_at, due_date, priority, reminder_policy) "
                f"VALUES ('{task['task_id']}', '{task['title']}', '{task['tag']}', '{task['thread_id']}', "
                f"'{task['created_at']}', '{task['due_date']}', '{task['priority']}', '{task['reminder_policy']}');"
            )
        )
        conn.commit()
    return True
