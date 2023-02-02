from django.db import models

# Create your models here.
class Task(models.Model):
    Title=models.CharField(max_length=250)
    Completed=models.BooleanField(default=False)
    
    def change_status(self):
        self.Completed = not self.Completed
    
    