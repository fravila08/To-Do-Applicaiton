from django.test import TestCase
from to_do_app.models import *
# Create your tests here.


class TestModels(TestCase):
    
    def setUp(self):
        self.task= Task.objects.create(Title="Test out my app")
        
    def test_task_creation(self):
        self.assert_(self.task)
        
    def test_changing_task_complete_change(self):
        self.task.change_status()
        self.assertTrue(self.task.Completed)