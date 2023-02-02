from django.test import TestCase, Client
from django.urls import reverse, resolve
import json
from to_do_app.views import *

class TestViews(TestCase):
    
    def test_get_all_tasks(self):
        client=Client()
        response=client.get(reverse("allTasks"))
        body=json.loads(response.content)
        self.assertEquals(body, {'completed':[],'pending':[], 'biggestId':1})