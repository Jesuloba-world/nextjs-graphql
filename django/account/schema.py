import graphene
import graphql_jwt
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType
from graphql_auth import mutations
from graphql_auth.schema import MeQuery
from graphql_jwt.decorators import login_required


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class Query(MeQuery, graphene.ObjectType):
    user_detail = graphene.Field(UserType)

    def resolve_user_detail(root, info):
        user = info.context.user

        print(user)

        if not user.is_authenticated:
            raise Exception("Authentication not provided")
        return User.objects.get(username=user)


class Mutation(graphene.ObjectType):
    register = mutations.Register.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
