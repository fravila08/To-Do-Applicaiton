from django.urls import path
from .views import Task_handler, Multi_task_handler
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('allTasks/', Task_handler.as_view(), name='allTasks'),
    path('newtask/', Task_handler.as_view(), name='newtask'),
    path('changestatus/<int:id>', Task_handler.as_view(), name='changestatus'),
    path('changemultiple', Multi_task_handler.as_view(), name='multiple'),
    path('deletask/<int:id>', Task_handler.as_view(), name='deletetask'),
    path('deletemultiple', Multi_task_handler.as_view(), name='deletemult')
]
