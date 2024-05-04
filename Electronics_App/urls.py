from django.urls import path
from rest_framework.routers import DefaultRouter
from Electronics_App import views
from django.contrib.auth import views as auth_views
from .views import DeleteCategoryView


urlpatterns = [
    path('', views.home_view, name='home'),
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='index.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('profile/', views.profile_view, name='profile'),
    path('product/<pk>/', views.product_view, name='product'),
    path('category/<pk>', views.category_view, name="category"),
    path('API/profile/', views.UserProfile.as_view(), name='api_profile'),
    path('API/categories/', views.CategoryList.as_view(), name='category_list'),
    path('API/categories/<pk>/', views.CategoryDetail.as_view(), name='category_detail'),
    path('API/products/', views.ProductList.as_view(), name='product_list'),
    path('API/products/<pk>/', views.ProductDetail.as_view(), name='product_detail'),
    path('API/order/', views.AddProductToOrder.as_view(), name='order_item_create'),
    path('API/orders/', views.OrderList.as_view(), name='order_list'),
    path('API/orders/<pk>/', views.OrderDetail.as_view(), name='order_detail'),
    path('API/payments/', views.PaymentList.as_view(), name='payment_list'),
    path('API/payments/<pk>/', views.PaymentDetail.as_view(), name='payment_detail'),
    path('delete-category/<int:category_id>/', DeleteCategoryView.as_view(), name='delete-category'),
]