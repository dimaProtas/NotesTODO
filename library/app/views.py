# from django.shortcuts import render
# from rest_framework.viewsets import ModelViewSet
from .models import UserAbstract
from .serializers import UsersModelSerializer, UsersModelSerializerBase
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination


# Можно просматривать список и каждого пользователя, можно редактировать, нельзя удалять и создовать пользователей
class UsersCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                         viewsets.GenericViewSet):
    queryset = UserAbstract.objects.all()
    serializer_class = UsersModelSerializerBase

    def get_serializer_class(self):
        if self.request.version == '1.0':
            return UsersModelSerializer
        elif self.request.version == '1.1':
            return UsersModelSerializerBase

# class UsersModelViewSet(ModelViewSet):
#     queryset = Users.objects.all()
#     serializer_class = UsersModelSerializer
