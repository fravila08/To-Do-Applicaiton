from .models import *
from django.http import JsonResponse

def get_all_tasks_sorted_by_id():
    my_tasks = list(Task.objects.all().values())
    my_tasks=sorted(my_tasks, key=lambda x:x['id'])
    return JsonResponse({'tasks':my_tasks})

def create_a_new_task(title):
    newTask=Task.objects.create(title=title)
    newTask.save()
    return JsonResponse({'itemCreated':True, 'id': newTask.id})

def change_task_status_by_id(id):
    task= Task.objects.get(id=id)
    task.change_status()
    
def delete_task_by_id(id):
    task=Task.objects.get(id=id)
    task.delete()

def change_task_title(id, name):
    task= Task.objects.get(id = id)
    task.change_title(name)

def delete_multiple_tasks(lst):
    [delete_task_by_id(i) for i in lst]
    return JsonResponse({'success':True})

def update_multiple_tasks_completed_status(lst):
    [change_task_status_by_id(i) for i in lst]
    return JsonResponse({'success':True})