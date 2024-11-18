import json
import uuid
from datetime import datetime
from random import randint

from gunicorn.util import daemonize
from sqlalchemy.sql.functions import random

from ai_interactions.prompts.handling_audio import USER_AUDIO_UPLOAD_SYSTEM_PROMPT
from controllers.reminders.create_reminder import create_reminder


def process_user_audio_gateway(audio_transcription, client):
    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": USER_AUDIO_UPLOAD_SYSTEM_PROMPT},
            {"role": "user", "content": audio_transcription}
        ]
    )
    return chat_completion.choices[0].message.content


def execute_llm_action_gateway(inferred_action):
    """
    :param inferred_action:
        inferred_action = '{"request_type": "create_reminder", "title": "Pick up package at the bank","time": "13:15", "expected_duration": "N/A"}'
    :return:
    """
    # load the action
    parsed_inferred_action = json.loads(inferred_action)
    # case handling for executing actions
    if parsed_inferred_action['request_type'] == "create_reminder":
        # Trigger the reminder controller in the application
        item = {
            "reminderid": "reminder.id." + str(uuid.uuid4()),
            "status": "to be done",
            "title": parsed_inferred_action.get("title", None),
            "description": parsed_inferred_action.get("description", None),
            "timestamp": parsed_inferred_action.get("timestamp", None)
        }
        create_reminder(item)
    elif parsed_inferred_action['request_type'] == "create_task":
        pass
    elif parsed_inferred_action['request_type'] == "create_event":
        pass
