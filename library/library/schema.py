import graphene
from graphene_django import DjangoObjectType
from app.models import UserAbstract
from todo.models import Todo, Project


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class UserAbstractType(DjangoObjectType):
    class Meta:
        model = UserAbstract
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)
    all_users = graphene.List(UserAbstractType)
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(UserAbstractType, id=graphene.Int(required=True))
    todo_by_user_name = graphene.List(TodoType, name=graphene.String(required=False))

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_all_users(root, info):
        return UserAbstract.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return UserAbstract.objects.get(id=id)
        except UserAbstract.DoesNotExist:
            return None

    def resolve_todo_by_user_name(root, info, name=None):
        todo = Todo.objects.all()
        if name:
            todo = todo.filter(user__username=name)
        return todo


class TodoMutation(graphene.Mutation):
    class Arguments:
        active = graphene.Boolean(required=True)
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, active, id):
        todo = Todo.objects.get(id=id)
        todo.active = active
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoMutation.Field()



schema = graphene.Schema(query=Query, mutation=Mutation)
