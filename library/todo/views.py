from django.shortcuts import render
from rest_framework.generics import get_object_or_404
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer, TodoModelSerializerBase, ProjectModelSerializerBase
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, TodoFilter
from rest_framework import viewsets, mixins, status, permissions


class ProjectLimitOffSetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffSetPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase


class TodoLimitOffSetPagination(LimitOffsetPagination):
    default_limit = 20


class TodotModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoLimitOffSetPagination
    filterset_class = TodoFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TodoModelSerializer
        return TodoModelSerializerBase

    def perform_destroy(self, instance, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save(update_fields=['active'])
        return instance
