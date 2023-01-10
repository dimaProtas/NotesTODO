from django.db import models
from sqlalchemy import true

from app.models import User


class Project(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=250, blank=True)
    users = models.ManyToManyField(User)


class Todo(models.Model):
    project = models.ForeignKey(Project, models.PROTECT)
    text = models.TextField(blank=true)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, models.PROTECT)
    active = models.BooleanField(default=True)
