from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from .models import *
from .utilities import *
# Create your views here.

def home(request):
    the_index = open('static/index.html').read()
    return HttpResponse(the_index)


class Task_handler(APIView):
    def get(self, request):
        return get_all_tasks_sorted_by_id()
    def post(self, request):
        try:
            return create_a_new_task(title=request.data['name'])
        except:
            return JsonResponse({'itemCreated':False, 'id':0})
    def put(self, request, id=0):
        try:
            return update_tasks_completed_status(id=id)
        except:
            return JsonResponse({'changed':False})


class Multi_task_handler(APIView):
    def put(self,request):
        try:
            return update_multiple_tasks_completed_status(request.data['selected'])
        except Exception as e:
            print(e)
            return JsonResponse({'success':False})
            
    