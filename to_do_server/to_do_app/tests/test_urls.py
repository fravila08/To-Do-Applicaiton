from django.test import TestCase,  Client
from django.urls import reverse, resolve
from to_do_app.views import *

class TestUrls(TestCase):
    
    def test_home_url_corresponding_func(self):
        url = reverse('home')
        self.assertEquals(resolve(url).func, home)
        
    def test_home_url_GET(self):
        client=Client()
        response = client.get(reverse('home'))
        self.assertEquals(response.status_code, 200)
        
    def test_allTasks_GET(self):
        client=Client()
        response=client.get(reverse("allTasks"))
        self.assertEquals(response.status_code, 200)
        
    def test_allTasks_func(self):
        url=reverse('allTasks')
        self.assertEquals(resolve(url).func, all_tasks)
        