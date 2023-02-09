from django.contrib import admin
from todo.models import Project, Todo


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'link']
    list_display_links = ['id', 'name']


class TodoAdmin(admin.ModelAdmin):
    list_display = ['id', 'project', 'text', 'created_at', 'updated_at', 'user', 'active']
    list_display_links = ['id']


admin.site.register(Project, ProjectAdmin)
admin.site.register(Todo, TodoAdmin)
