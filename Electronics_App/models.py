from django.conf import settings
from django.db import models
from django.contrib.auth.models import User



#from Electronics_App import admin.py           ########makes a circular import error



# Create your models here.
# def validate_not_blank(value):
#     if not value.strip():
#         raise ValidationError("Phone number cannot be blank.")


# class Seller(models.Model):
#    # user = models.OneToOneField(User, on_delete=models.CASCADE)  #make sure

#     phone = models.CharField(max_length=50, unique=True)
#     department = models.CharField(max_length=50)
#     cash_balance = models.DecimalField(max_digits=10, decimal_places=2)  #should be decimal


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=50, unique=True)

class Order(models.Model):
    customer= models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    Delivery_date = models.DateField()
    Order_date = models.DateTimeField(auto_now_add=True)
    Complain = models.TextField()
    address = models.TextField()

class Payment(models.Model):
    #customer = models.ForeignKey(Customer, on_delete=models.CASCADE,related_name='payments') # user or customer
    order =  models.ForeignKey(Order,on_delete=models.CASCADE,related_name='payments')
    method = models.CharField(max_length=50)
    amount = models.CharField(max_length=50)

class Category(models.Model):
    title = models.CharField(max_length=200)
    def __str__(self):
        return self.title

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField(default=100)
    quantity = models.IntegerField()
    description = models.TextField(default='')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    picture = models.ImageField(upload_to="img", default="")

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items')
    price = models.IntegerField()
    quantity = models.SmallIntegerField(default=1)


# class update(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
#     sold_quantity = models.IntegerField()
#     remaining_quantity = models.IntegerField()


