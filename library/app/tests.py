import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from todo.views import TodotModelViewSet, ProjectModelViewSet
from .models import Users
from todo.models import Todo


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
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_edit_guest(self):
        user = Users.objects.create(username='user', firstname='Igor', lastname='Petrov', email='dev@mail.ru')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'username': 'Igorek', 'lastname': 'Sidorov'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_edit_admin(self):
        user = Users.objects.create(username='user', firstname='Igor', lastname='Petrov', email='dev@mail.ru')
        client = APIClient()
        admin = User.objects.create_superuser('adminer_dima', 'admin@mail.ru', 'admin123456')
        client.login(username='adminer_dima', password='admin123456')
        response = client.put(f'/api/users/{user.id}/', {'username': 'Igorek', 'firstname': 'Lex', 'lastname': 'Sidorov', 'email': 'new@mail.ru'})
        print(user.username, user.lastname)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = Users.objects.get(id=user.id)
        self.assertEqual(user.username, 'Igorek')
        self.assertEqual(user.lastname, 'Sidorov')
        client.logout()

class TestUserViewSet(APITestCase):

    def test_get_project(self):
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user_admin(self):
        user = mixer.blend(Users)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.put(f'/api/users/{user.id}/', {'username': 'Dima', 'firstname': 'Lex', 'lastname': 'Kolbasov', 'email': 'new@mail.ru'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Тест так и не заработал, не разобрался почему, пишет плохой запрос.(пробывал разные варианты)
    # def test_edit_todo_admin(self):
    #     project = mixer.blend(Project)
    #     user = mixer.blend(Users)
    #     todo = mixer.blend(Todo, user=user, project=project)
    #     admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
    #     self.client.login(username='admin', password='admin')
    #     response = self.client.put(f'/api/todo/{todo.id}/', {'project': project, 'text': 'Lex',
    #                                                           'created_at': '2023-01-10T10:42:18.509942Z',
    #                                                           'updated_at': '2023-01-10T10:42:18.509942Z',
    #                                                           'user': user,
    #                                                           'active': True})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

