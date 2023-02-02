from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import *
# Create your views here.

def home(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['GET','POST'])
def all_tasks(request):
    if request.method=='GET':
        myTasks = list(Task.objects.all().values())
        completedTasks= filter(lambda x:x['Completed'] ==True, myTasks)
        pendingTasks=filter(lambda x:x['Completed'] == False, myTasks)
        completedTasks=list(completedTasks)
        pendingTasks=list(pendingTasks)
        biggestId=1
        if len(myTasks)>=1:
            biggestId=max(myTasks, key=lambda x:x['id'])['id']
        return JsonResponse({"completed":completedTasks, 'pending':pendingTasks,"biggestId":biggestId})
    