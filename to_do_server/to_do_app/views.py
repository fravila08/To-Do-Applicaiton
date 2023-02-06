from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import *
# Create your views here.

def home(request):
    the_index = open('static/index.html').read()
    return HttpResponse(the_index)

@api_view(['GET', 'POST','PUT'])
def all_tasks(request, id=0):
    if request.method=='GET':
        my_tasks = list(Task.objects.all().values())
        return JsonResponse({'tasks':my_tasks})
    elif request.method=='POST':
        try:
            newTask=Task.objects.create(title=request.data['name'])
            newTask.save()
            return JsonResponse({'itemCreated':True, 'id': newTask.id})
        except:
            return JsonResponse({'itemCreated':False, 'id':0})
    elif request.method =='PUT':
        try:
            task= Task.objects.get(id=id)
            task.change_status()
            return JsonResponse({'changed':True})
        except:
            return JsonResponse({'changed':False})

@api_view(['PUT'])
def multi_task_handler(request):
    if request.method == 'PUT':
        try:
            def grab_task_and_change_status(id):
                task= Task.objects.get(id=id)
                task.change_status()
                
            selectedTasks=request.data['selected']
            [grab_task_and_change_status(i) for i in selectedTasks]
            return JsonResponse({'success':True})
        except Exception as e:
            print(e)
            return JsonResponse({'success':False})
            
    