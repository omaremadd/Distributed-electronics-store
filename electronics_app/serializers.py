from rest_framework import serializers
from .models import Product, Order, OrderItem, Customer, Category
from django.contrib.auth.models import User
from datetime import datetime, timedelta

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

class ProductSerializer(serializers.ModelSerializer):
    category_title = serializers.SlugRelatedField(
        source='category',
        slug_field='title',
        read_only=True
    )
    category_id = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'quantity', 'description', 'category_title', 'category_id', 'picture']
    
    def get_category_id(self, obj):
        return obj.category.id

class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = '__all__'

class ProductItemSerializer(serializers.Serializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    quantity = serializers.IntegerField(default=1)

class PlaceOrderSerializer(serializers.ModelSerializer):
    items = ProductItemSerializer(many=True)
    Delivery_date = serializers.DateField(read_only=True)
    Complain = serializers.CharField(allow_blank=True, required=False)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'items', 'total_price', 'Order_date','Delivery_date', 'address', 'Complain']

    def create(self, validated_data):
        customer = self.context['request'].user
        items = validated_data.pop('items')
        address = validated_data.get('address')
        Complain = validated_data.get('Complain', 'No complaints')
        if Complain == '':
            Complain = 'No complaints'
        # Set the delivery date to the current date plus 3 days
        delivery_date = datetime.now().date() + timedelta(days=3)

        # Check if the requested quantity is available for all items
        for item in items:
            product = Product.objects.get(pk=item.get('product').pk)
            quantity = item.get('quantity')
            if product.quantity < quantity:
                raise serializers.ValidationError(f'Not enough quantity for product {product.pk}')

        order = Order.objects.create(
            customer=customer, 
            Delivery_date=delivery_date, 
            address=address, 
            Complain=Complain
        )

        total_price = 0
        for item in items:
            product = Product.objects.get(pk=item.get('product').pk)
            quantity = item.get('quantity')
            total_price += product.price * quantity

            OrderItem.objects.create(
                order=order,
                product=product,
                price=product.price,
                quantity=quantity
            )
            # Update the quantity of the product
            product.quantity -= quantity
            product.save()

        order.total_price = total_price
        order.save()

        return order
    
    def get_total_price(self, obj):
        return obj.total_price

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = ['product', 'price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'customer', 'Delivery_date', 'Order_date', 'items', 'address', 'Complain']
