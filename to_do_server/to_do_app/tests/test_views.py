from django.test import TestCase, Client
from django.urls import reverse
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
        
    def test_new_task_IMPROPER_input(self):
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
        
        
    def test_change_multiple_IMPROPER_input(self):
        response= self.client.put(reverse('multiple'), data={'selected':1}, content_type="application/json")
        body=json.loads(response.content)
        self.assertFalse(body['success'])

    def test_proper_multiple_PROPER_input(self):
        task1=Task.objects.create(title='test')
        task2=Task.objects.create(title='test')
        task3=Task.objects.create(title='test')
        response=self.client.put(reverse('multiple'), data={'selected':[task1.id, task2.id, task3.id]}, content_type="application/json")
        body=json.loads(response.content)
        self.assertTrue(body['success'])
        
    def test_delete_a_task_PROPER_input(self):
        task1=Task.objects.create(title="test")
        response=self.client.delete(reverse("deletetask", args=[task1.id]))
        body=json.loads(response.content)
        self.assertTrue(body['success'])
    
    def test_delete_a_task_IMPROPER_input(self):
        response=self.client.delete(reverse("deletetask", args=[0]))
        body=json.loads(response.content)
        self.assertFalse(body['success'])
        
    def test_delete_multiple_task_PROPER_input(self):
        task1=Task.objects.create(title='test')
        task2=Task.objects.create(title='test')
        task3=Task.objects.create(title='test')
        response=self.client.delete(reverse('deletemult'), data={"selected":[task1.id,task2.id,task3.id]}, content_type="application/json")
        body=json.loads(response.content)
        self.assertTrue(body['success'])
        
    def test_delete_multiple_task_IMPROPER_input(self):
        response=self.client.delete(reverse('deletemult'), data={"selected":[0]}, content_type="application/json")
        body=json.loads(response.content)
        self.assertFalse(body['success'])