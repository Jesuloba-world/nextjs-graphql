from msilib import schema

import graphene
from graphene_django import DjangoObjectType

from .models import Category, Product


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = ("id", "title", "description", "slug", "regular_price")
        description = "This is a product"


class Query(graphene.ObjectType):

    all_Products = graphene.List(ProductType)

    def resolve_all_Products(root, info):
        return Product.objects.all()
