from django.shortcuts import render, redirect
from django.contrib.auth import login
from rest_framework import generics
from MySQLdb import IntegrityError
from .models import Product, Order, Customer, Category
from .serializers import *
from .forms import SignUpForm

def home_view (request):
    return render(request, 'home.html')

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            customer = Customer.objects.create(user=user)
            try:
                customer.phone = form.cleaned_data.get('phone')
                customer.save()
            except IntegrityError:
                form.add_error('phone', 'This phone number is already in use.')
                return render(request, 'signup.html', {'form': form})
            login(request, user)
            return redirect('home')
        else:
            print(form.errors)
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

class UserProfile(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

def profile_view(request):
    if request.user.is_authenticated:
        if request.user.is_superuser:
            return render(request, 'seller_profile.html')
        else:
            return render(request, 'profile.html')
    else:
        return redirect('login')
    
def checkout_view(request):
    if request.user.is_authenticated:
        return render(request, 'checkout.html')
    else:
        return redirect('login')

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

def product_view(request, pk):
    product = Product.objects.get(pk=pk)
    return render(request, 'product.html', {'product': product})

def category_view(request, pk):
    category = Category.objects.get(pk=pk)
    return render(request, 'category.html', {'category': category})

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer

class CategoryDetail(generics.RetrieveAPIView):
    serializer_class = CategorySerializer
    lookup_field = 'pk'
    def get_queryset(self):
        return Category.objects.all().prefetch_related('products')

class PlaceOrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = PlaceOrderSerializer

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

class UserOrderList(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)

class OrderList(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderDetail(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'pk'
