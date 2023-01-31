from django.db import models
from app.models import UserAbstract


class Project(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=250, blank=True)
    users = models.ManyToManyField(UserAbstract)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


class Todo(models.Model):
    project = models.ForeignKey(Project, models.PROTECT)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(UserAbstract, models.PROTECT)
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
