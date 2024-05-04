from rest_framework import serializers
from .models import Product, Payment, Order, OrderItem, Customer
from django.contrib.auth.models import User


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
        fields = ['customer', 'Delivery_date', 'Order_date', 'Complain', 'products','address']
    
    def get_products(self, obj):
        contains = OrderItem.objects.filter(Order=obj)
        products = [c.Product for c in contains]
        return ProductSerializer(products, many=True).data

class UserSerializer(serializers.ModelSerializer):
    phone = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'phone']
    def get_phone(self, obj):
        try:
            customer = Customer.objects.get(user=obj)
            return customer.phone
        except Customer.DoesNotExist:
            return None