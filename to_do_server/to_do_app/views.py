from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import *
# Create your views here.

def home(request):
    the_index = open('static/index.html').read()
    return HttpResponse(the_index)

class Task_handler(APIView):
    def get(self, request):
        my_tasks = list(Task.objects.all().values())
        return JsonResponse({'tasks':my_tasks})
    def post(self, request):
        try:
            newTask=Task.objects.create(title=request.data['name'])
            newTask.save()
            return JsonResponse({'itemCreated':True, 'id': newTask.id})
        except:
            return JsonResponse({'itemCreated':False, 'id':0})

    