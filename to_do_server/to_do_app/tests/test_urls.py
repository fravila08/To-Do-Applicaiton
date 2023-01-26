from django.test import TestCase, SimpleTestCase, Client
from django.urls import reverse, resolve
from to_do_app.views import *

class TestUrls(SimpleTestCase):
    
    def test_home_url_corresponding_func(self):
        url = reverse('home')
        self.assertEquals(resolve(url).func, home)
        
    def test_home_url_GET(self):
        client=Client()
        response = client.get(reverse('home'))
        self.assertEquals(response.status_code, 200)
        