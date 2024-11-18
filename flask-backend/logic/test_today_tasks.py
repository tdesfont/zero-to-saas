import os
from unittest import TestCase

from logic.today_tasks import retrieve_todays_tasks_summary


class Test(TestCase):

    def test_retrieve_todays_tasks_summary(self):
        openai_api_key = os.environ.get("OPENAI_API_KEY")
        response = retrieve_todays_tasks_summary(openai_api_key)
        print(response)