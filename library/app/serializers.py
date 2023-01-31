from rest_framework.serializers import HyperlinkedModelSerializer
from .models import UserAbstract


class UsersModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = UserAbstract
        fields = ['id', 'username', 'firstname', 'lastname', 'email']


class UsersModelSerializerBase(HyperlinkedModelSerializer):
    class Meta:
        model = UserAbstract
        fields = ['id', 'username', 'firstname', 'lastname', 'email', 'is_superuser', 'is_staff']
