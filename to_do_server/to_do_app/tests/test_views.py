from django.test import TestCase, Client, TransactionTestCase
from django.urls import reverse, resolve
import json
from to_do_app.views import *

class TestViews(TestCase):
    def setUp(self):
        self.client=Client()
    
    def test_get_all_tasks(self):
        response=self.client.get(reverse("allTasks"))
        body=json.loads(response.content)
        self.assertEquals(body, {'tasks':[]})
        
    def test_new_task_body(self):
        response=self.client.post(reverse('newtask'))
        body=json.loads(response.content)
        self.assertDictEqual(body,{'itemCreated':False, 'id':0})
        
    def test_new_task_improper_input(self):
        response=self.client.post(reverse('newtask'))
        body=json.loads(response.content)
        self.assertFalse(body['itemCreated'])
        
    def test_new_task_PROPER_input(self):
        response=self.client.post(reverse('newtask'),{'name':"testing"})
        body=json.loads(response.content)
        self.assertTrue(body['itemCreated'])
        
    def test_change_status_body(self):
        task=self.client.post(reverse('newtask'),{'name':"testing"})
        body=json.loads(task.content)
        response = self.client.put(reverse("changestatus", args=[body['id']]))
        body=json.loads(response.content)
        self.assertDictEqual(body,{'changed':True})
        
    def test_change_status_PROPER_input(self):
        task=self.client.post(reverse('newtask'),{'name':"testing"})
        body=json.loads(task.content)
        response = self.client.put(reverse("changestatus", args=[body['id']]))
        body=json.loads(response.content)
        self.assertTrue(body['changed'])
        
    def test_change_status_IMPROPER_input(self):
        response = self.client.put(reverse("changestatus", args=[1]))
        body=json.loads(response.content)
        self.assertFalse(body['changed'])
