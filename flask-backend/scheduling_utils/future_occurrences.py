from datetime import datetime
from turtledemo.penrose import start


def get_next_occurrences_from_today(frequency, target_date, n):
    if frequency == "daily":
        pass


def has_occurrence_today(frequency, start_date, target_date=None, today=None):
    if today is None:
        today = datetime.today().date()
    if today < start_date:
        return False
    if target_date is not None and today > target_date:
        return False
    # start_date <= today <= target_date[potentially inf]
    if frequency == "daily":
        return True
    elif frequency == "weekly":
        return today.weekday() == start_date.weekday()
    elif frequency == "monthly":
        return today.day == start_date.day
