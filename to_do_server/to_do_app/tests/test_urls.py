from django.test import TestCase,  Client
from django.urls import reverse, resolve
from to_do_app.views import *
from to_do_app import views

class TestUrls(TestCase):
    def setUp(self):
        self.client=Client()
    
    def test_home_url_corresponding_func(self):
        url = reverse('home')
        self.assertEquals(resolve(url).func, home)
        
    def test_home_url_GET(self):
        response = self.client.get(reverse('home'))
        self.assertEquals(response.status_code, 200)
        
    def test_allTasks_GET(self):
        response=self.client.get(reverse("allTasks"))
        self.assertEquals(response.status_code, 200)
        
    def test_allTasks_func(self):
        url=reverse('allTasks')
        self.assertEqual(resolve(url).func.view_class, Multi_task_handler)
        
    def test_newtask_POST_proper_input(self):
        response=self.client.post(reverse('newtask'),{'name':"testing"})
        self.assertEquals(response.status_code, 200)
        
    def test_newtask_POST_improper_input(self):
        response=self.client.post(reverse('newtask'))
        self.assertEquals(response.status_code, 200)
        
    def test_new_task_func(self):
        url=reverse('newtask')
        self.assertAlmostEqual(resolve(url).func.view_class, Task_handler)
        
    def test_change_statu_PUT_improper(self):
        response=self.client.put(reverse('changestatus', args=[1]))
        self.assertEquals(response.status_code, 200)
    
    def test_change_statu_PUT_proper(self):
        self.client.post(reverse('newtask'),{'name':'testing'})
        response=self.client.put(reverse('changestatus', args=[1]))
        self.assertEquals(response.status_code, 200)
        
    def test_change_status_func(self):
        url =reverse('changestatus', args=[1])
        self.assertEquals(resolve(url).func.view_class, Task_handler)
        
    def test_change_multiple_PUT_proper(self):
        response= self.client.put(reverse('multiple'),{'selected':[1,2,3]})
        self.assertEquals(response.status_code, 200)
        
    def test_change_multiple_PUT_improper(self):
        response= self.client.put(reverse('multiple'))
        self.assertEquals(response.status_code, 200)
        
    def test_change_multiple_PUT_func(self):
        url=reverse('multiple')
        self.assertEquals(resolve(url).func.view_class, Multi_task_handler)
