from django.contrib import admin

from .models import Product, Payment, Order,Customer, Seller
# Register your models here.
admin.site.register(Product)
admin.site.register(Payment)
admin.site.register(Order)
admin.site.register(Customer)
class SellerAdmin(admin.ModelAdmin):
    list_display = ('phone', 'admin_id', 'department', 'cash_balance')

admin.site.register(Seller, SellerAdmin)
