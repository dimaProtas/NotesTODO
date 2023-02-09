from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import UserAbstract


class UsersModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = UserAbstract
        fields = ['id', 'username', 'firstname', 'lastname', 'email']


class UsersModelSerializerBase(ModelSerializer):
    class Meta:
        model = UserAbstract
        fields = ['id', 'username', 'firstname', 'lastname', 'email', 'is_superuser', 'is_staff']
