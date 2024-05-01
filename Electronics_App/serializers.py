from rest_framework import serializers
from .models import Product, Payment, Order, contain

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['customer', 'Order_id', 'Delivery_date', 'Order_date', 'Complain', 'products']
    
    def get_products(self, obj):
        contains = contain.objects.filter(Order=obj)
        products = [c.Product for c in contains]
        return ProductSerializer(products, many=True).data
