from rest_framework import serializers
from .models import Product, Payment, Order, OrderItem, Customer, Category
from django.contrib.auth.models import User

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
    category = serializers.SlugRelatedField(
        slug_field='title',
        queryset=Category.objects.all()
        )
    class Meta:
        model = Product
        fields = '__all__'

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
    product = serializers.SlugRelatedField(slug_field='name', queryset=Product.objects.all())
    quantity = serializers.IntegerField(default=1)

class PlaceOrderSerializer(serializers.Serializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    items = ProductItemSerializer(many=True)

    def create(self, validated_data):
        customer = validated_data.get('customer')
        items = validated_data.pop('items')
        order = Order.objects.create(customer=customer)

        for item in items:
            product = item.get('product')
            quantity = item.get('quantity')

            OrderItem.objects.create(
                order=order,
                product=product,
                price=product.price,
                quantity=quantity
            )

        return order

class AddProductToOrderSerializer(serializers.Serializer):
    order = serializers.SlugRelatedField(slug_field='id', queryset=Order.objects.all())
    product = serializers.SlugRelatedField(slug_field='name', queryset=Product.objects.all())
    quantity = serializers.IntegerField(default=1)

    def create(self, validated_data):
        order = validated_data.get('order')
        product = validated_data.get('product')
        quantity = validated_data.get('quantity')

        order_item = OrderItem.objects.create(
            order=order,
            product=product,
            price=product.price,
            quantity=quantity
        )

        return order_item

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
    # def get_products(self, obj):
    #     contains = OrderItem.objects.filter(Order=obj)
    #     products = [c.Product for c in contains]
    #     return ProductSerializer(products, many=True).data

class PaymentSerializer(serializers.ModelSerializer):
    amount = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = ['id', 'order', 'method', 'amount']  # Include 'amount' as a read-only field

    def get_amount(self, obj):
        # Calculate the total amount of the order
        total_amount = 0
        for item in OrderItem.objects.filter(order=obj.order):
            total_amount += item.price * item.quantity

        return total_amount

    def create(self, validated_data):
        order = validated_data.get('order')

        # Calculate the total amount of the order
        total_amount = 0
        for item in OrderItem.objects.filter(order=order):
            total_amount += item.price * item.quantity

        # Set the amount of the payment to the total amount of the order
        validated_data['amount'] = total_amount

        return super().create(validated_data)