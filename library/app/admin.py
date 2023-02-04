from django.contrib import admin
from app.models import UserAbstract


# class UsersAdmin(admin.ModelAdmin):
#     list_display = ['id', 'username', 'email', 'firstname', 'lastname']
#     list_display_links = ['id', 'email']


class UserAbstractAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'firstname', 'lastname', 'is_superuser', 'is_staff']
    list_display_links = ['id', 'email']


# admin.site.register(Users, UsersAdmin)
admin.site.register(UserAbstract, UserAbstractAdmin)


