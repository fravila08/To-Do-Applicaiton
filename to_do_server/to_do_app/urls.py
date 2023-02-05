from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('allTasks', views.all_tasks, name='allTasks'),
    path('newtask', views.all_tasks, name='newtask'),
    path('changestatus/<int:id>', views.all_tasks, name='changestatus'),
]
