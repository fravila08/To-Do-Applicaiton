from django.db import models

# Create your models here.
class Task(models.Model):
    Title=models.CharField(max_length=250)
    Completed=models.BooleanField(default=False)
    # ParentTask=models.ForeignKey("Task",null=True, on_delete=models.CASCADE)
    # User= models.ForeignKey("AppUser", null=True, on_delete=models.CASCADE)
    def change_status(self):
        self.Completed = not self.Completed
    
    