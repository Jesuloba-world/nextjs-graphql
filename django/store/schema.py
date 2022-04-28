import graphene
from graphene_django import DjangoObjectType

from .models import Product, ProductImage


class ProductImageType(DjangoObjectType):
    class Meta:
        model = ProductImage
        fields = ("id", "image", "alt_text")
        description = "This is the Product Image"

    def resolve_image(self, info):
        if self.image:
            self.image = info.context.build_absolute_uri(self.image.url)
        return self.image


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = ("id", "title", "description", "slug", "regular_price", "product_image")
        description = "This is a product"


class Query(graphene.ObjectType):

    all_Products = graphene.List(ProductType)

    def resolve_all_Products(root, info):
        return Product.objects.all()
