from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('allTasks', views.all_tasks, name='allTasks'),
]
