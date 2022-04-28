import graphene
from store.schema import Query as StoreQuery


class Query(StoreQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
