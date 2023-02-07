from django.urls import path
from .views import Task_handler
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('allTasks/', Task_handler.as_view(), name='allTasks'),
    path('newtask/', Task_handler.as_view(), name='newtask')
]
