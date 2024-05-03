from django.urls import path
from rest_framework.routers import DefaultRouter
from Electronics_App import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.home_view, name='home'),
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='index.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('API/profile/', views.profile_view, name='profile'),
    path('API/products/', views.ProductList.as_view(), name='product_list'),
    path('API/products/<pk>/', views.ProductDetail.as_view(), name='product_detail'),
    path('API/payments/', views.PaymentList.as_view(), name='payment_list'),
    path('API/payments/<pk>/', views.PaymentDetail.as_view(), name='payment_detail'),
    path('API/orders/', views.OrderList.as_view(), name='order_list'),
    path('API/orders/<pk>/', views.OrderDetail.as_view(), name='order_detail'),
]