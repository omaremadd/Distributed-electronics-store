from django.contrib import admin

from .models import Product, Payment, Order,Customer ,Category
# Register your models here.
admin.site.register(Product)
admin.site.register(Payment)
admin.site.register(Order)
admin.site.register(Customer)
admin.site.register(Category)
