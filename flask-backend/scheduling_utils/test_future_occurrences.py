from unittest import TestCase
from future_occurrences import has_occurrence_today
import datetime

class Test(TestCase):

    def test_has_occurrence_today(self):
        frequency = "daily"
        today = datetime.datetime(2024, 10, 28, 12, 25, 5, 252929)
        start_date = datetime.datetime(2024, 10, 27, 12, 25, 5, 252929)
        target_date = datetime.datetime(2024, 11, 27, 12, 25, 5, 252929)
        assert has_occurrence_today(frequency, start_date, target_date, today=today)

    def test_has_occurrence_today__no_occ(self):
        frequency = "daily"
        today = datetime.datetime(2024, 10, 25, 12, 25, 5, 252929)
        start_date = datetime.datetime(2024, 10, 27, 12, 25, 5, 252929)
        target_date = datetime.datetime(2024, 11, 27, 12, 25, 5, 252929)
        assert not has_occurrence_today(frequency, start_date, target_date, today=today)

    def test_has_occurrence_today__weekly(self):
        frequency = "weekly"
        today = datetime.datetime(2024, 10, 27, 12, 25, 5, 252929)
        start_date = datetime.datetime(2024, 10, 20, 12, 25, 5, 252929)
        assert has_occurrence_today(frequency, start_date, today=today)
        today = datetime.datetime(2024, 10, 28, 12, 25, 5, 252929)
        assert not has_occurrence_today(frequency, start_date, today=today)

    def test_has_occurrence_today__monthly(self):
        frequency = "monthly"
        today = datetime.datetime(2024, 11, 20, 12, 25, 5, 252929)
        start_date = datetime.datetime(2024, 10, 20, 12, 25, 5, 252929)
        assert has_occurrence_today(frequency, start_date, today=today)
