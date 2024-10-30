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


if __name__ == "__main__":
    print(retrieve_todays_tasks())
