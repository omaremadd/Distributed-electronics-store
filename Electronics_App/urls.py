from django.urls import path
from rest_framework.routers import DefaultRouter
from Electronics_App import views
from django.contrib.auth import views as auth_views
#from Frontend.html import index


urlpatterns = [
    path('products/', views.ProductList.as_view(), name='product_list'),
    path('products/<pk>/', views.ProductDetail.as_view(), name='product_detail'),
    path('payments/', views.PaymentList.as_view(), name='payment_list'),
    path('payments/<pk>/', views.PaymentDetail.as_view(), name='payment_detail'),
    path('orders/', views.OrderList.as_view(), name='order_list'),
    path('orders/<pk>/', views.OrderDetail.as_view(), name='order_detail'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('login/', auth_views.LoginView.as_view(template_name='index.html'), name='login'),
]