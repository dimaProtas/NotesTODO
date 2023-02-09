from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Todo, Project
from app.serializers import UsersModelSerializerBase
from todo.models import UserAbstract


class ProjectModelSerializer(serializers.ModelSerializer):
    # Вывожу имена участников проэкта, что бы получить ссылки участников нужно удалить эту строку кода.
    users = UsersModelSerializerBase(many=True)
    # users = serializers.StringRelatedField(many=True)
    # users = serializers.PrimaryKeyRelatedField(queryset=UserAbstract.objects.all(), many=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'link', 'users']


class ProjectModelSerializerBase(HyperlinkedModelSerializer):
    # Вывожу имена участников проэкта, что бы получить ссылки участников нужно удалить эту строку кода.
    # users = UsersModelSerializerBase(many=True)
    # users = serializers.StringRelatedField(many=True)
    # users = serializers.PrimaryKeyRelatedField(queryset=UserAbstract.objects.all(), many=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'link', 'users']




class TodoModelSerializer(HyperlinkedModelSerializer):
    project = ProjectModelSerializer(read_only=True) #Вывожу инвормацию о проекте(удалить строку, что бы получить ссылку project)
    user = UsersModelSerializerBase(read_only=True) #Имя пользователя создавшего запись(удалить строку, что бы получить ссылку user)
    class Meta:
        model = Todo
        fields = ['id', 'project', 'text', 'created_at', 'updated_at', 'user', 'active']


class TodoModelSerializerBase(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'project', 'text', 'created_at', 'updated_at', 'user', 'active']
