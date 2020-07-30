from django.db import models
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class Events(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    datetime = models.DateTimeField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    task_id = models.CharField(max_length=50, default='')

