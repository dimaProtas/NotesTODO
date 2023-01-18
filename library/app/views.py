# from django.shortcuts import render
# from rest_framework.viewsets import ModelViewSet
from .models import Users
from .serializers import UsersModelSerializer
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination


# Можно просматривать список и каждого пользователя, можно редактировать, нельзя удалять и создовать пользователей
class UsersCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                         viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer

# class UsersModelViewSet(ModelViewSet):
#     queryset = Users.objects.all()
#     serializer_class = UsersModelSerializer
