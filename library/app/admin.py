from django.contrib import admin
from app.models import Users


class UsersAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'firstname', 'lastname']
    list_display_links = ['id', 'email']


admin.site.register(Users, UsersAdmin)


