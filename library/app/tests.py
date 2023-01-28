import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UsersCustomViewSet
from todo.views import TodotModelViewSet, ProjectModelViewSet
from .models import Users
from todo.models import Todo, Project


class TestTodoViewSet(TestCase):

    def test_get_list_todo(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todo/')
        view = TodotModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_created_todo_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/project/',
                               {'users': [], 'name': 'project_1', 'link': 'https://github.com'},
                               format='json')
        view = TodotModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_created_todo_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/project/',
                               {'users': [], 'name': 'project_1', 'link': 'https://github.com'},
                               format='json')
        admin = User.objects.create_superuser('admin', 'admin@adimin.com', 'admin')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_user_detail(self):
        user = Users.objects.create(username='user', firstname='Igor', lastname='Petrov', email='dev@mail.ru')
        print(user.id, user.username, user.lastname, user.firstname, user.email)
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
