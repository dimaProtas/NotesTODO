from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Todo, Project
from app.serializers import UsersModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    # Вывожу имена участников проэкта, что бы получить ссылки участников нужно удалить эту строку кода.
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(HyperlinkedModelSerializer):
    project = ProjectModelSerializer() #Вывожу инвормацию о проекте(удалить строку, что бы получить ссылку project)
    user = UsersModelSerializer() #Имя пользователя создавшего запись(удалить строку, что бы получить ссылку user)
    class Meta:
        model = Todo
        fields = '__all__'
