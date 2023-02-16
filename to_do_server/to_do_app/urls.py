from django.urls import path
from .views import Task_handler, Multi_task_handler
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('tasks/', Multi_task_handler.as_view(), name='allTasks'),
    path('task/', Task_handler.as_view(), name='newtask'),
    path('task/<int:id>/', Task_handler.as_view(), name='changestatus'),
    path('tasks/', Multi_task_handler.as_view(), name='multiple'),
    path('task/<int:id>/', Task_handler.as_view(), name='deletetask'),
    path('tasks/', Multi_task_handler.as_view(), name='deletemult')
]
