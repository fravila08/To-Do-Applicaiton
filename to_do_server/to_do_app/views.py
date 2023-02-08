from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from .models import *
# Create your views here.

def home(request):
    the_index = open('static/index.html').read()
    return HttpResponse(the_index)


class Task_handler(APIView):
    def get(self, request):
        my_tasks = list(Task.objects.all().values())
        my_tasks=sorted(my_tasks, key=lambda x:x['id'])
        return JsonResponse({'tasks':my_tasks})
    @csrf_exempt
    def post(self, request):
        try:
            newTask=Task.objects.create(title=request.data['name'])
            newTask.save()
            return JsonResponse({'itemCreated':True, 'id': newTask.id})
        except:
            return JsonResponse({'itemCreated':False, 'id':0})
    def put(self, request, id=0):
        try:
            task= Task.objects.get(id=id)
            task.change_status()
            return JsonResponse({'changed':True})
        except:
            return JsonResponse({'changed':False})

    