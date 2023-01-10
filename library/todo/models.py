from django.db import models
from app.models import Users


class Project(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=250, blank=True)
    users = models.ManyToManyField(Users)


class Todo(models.Model):
    project = models.ForeignKey(Project, models.PROTECT)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Users, models.PROTECT)
    active = models.BooleanField(default=True)
