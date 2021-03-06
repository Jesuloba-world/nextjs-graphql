import graphene
from graphene_django import DjangoObjectType

from .models import Category, Product, ProductImage


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "name", "products", "level", "slug")


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

    product_by_name = graphene.Field(ProductType, slug=graphene.String(required=True))

    all_Categories = graphene.List(CategoryType)

    category_by_name = graphene.Field(CategoryType, name=graphene.String(required=True))

    def resolve_all_Categories(root, info):
        return Category.objects.filter(level=1)

    def resolve_category_by_name(root, info, name):
        try:
            return Category.objects.get(name=name)
        except Category.DoesNotExist:
            return None

    def resolve_all_Products(root, info):
        return Product.objects.all()

    def resolve_product_by_name(root, info, slug):
        try:
            return Product.objects.get(slug=slug)
        except Product.DoesNotExist:
            return None
