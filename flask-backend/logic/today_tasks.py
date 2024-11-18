from openai import OpenAI
import os
from datetime import datetime

from controllers.recurringtask.get_recurringtask import retrieve_recurringtask
from scheduling_utils.future_occurrences import has_occurrence_today


def retrieve_todays_tasks():
    recurring_tasks = retrieve_recurringtask()
    todays_items = []
    for task in recurring_tasks:
        frequency, start_date, target_date = task['frequency'], task['start_date'], task['target_date']
        if has_occurrence_today(frequency, start_date, target_date):
            todays_items.append(task)
    return todays_items


def retrieve_todays_tasks_summary(openai_api_key):
    recurring_tasks = retrieve_todays_tasks()

    client = (OpenAI(
        # This is the default and can be omitted
        api_key=openai_api_key,
    ))
    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful time scheduling assistant."},
            {"role": "user", "content": f'Give me a summary of the following tasks that I have to '
                                        f'do for the day. Give me also a sample timetable and some advice'
                                        f'regarding how to perform those tasks the most efficiently as possible'
                                        f':\n "{recurring_tasks}"'}
        ]
    )
    return chat_completion.choices[0].message.content


if __name__ == "__main__":
    print(retrieve_todays_tasks())
