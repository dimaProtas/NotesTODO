from django.db import models
from django.contrib.auth.models import AbstractUser


# class Users(models.Model):
#     username = models.CharField(max_length=100)
#     firstname = models.CharField(max_length=100)
#     lastname = models.CharField(max_length=100)
#     email = models.EmailField(verbose_name='email address')
#
#     def __str__(self):
#         return self.username
#
#     class Meta:
#         verbose_name = 'Пользователь'
#         verbose_name_plural = 'Пользователи'


class UserAbstract(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(verbose_name='email address')
    is_superuser = models.BooleanField(verbose_name='Суперпользователь', default=False)
    is_staff = models.BooleanField(verbose_name='Персонал', default=False)


    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'Пользователь Abstract'
        verbose_name_plural = 'Пользователи Abstract'