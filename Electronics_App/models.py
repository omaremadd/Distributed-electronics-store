import uuid
from django.conf import settings
from django.core.exceptions import ValidationError, PermissionDenied
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib import admin as django_admin
#from Electronics_App import admin.py           ########makes a circular import error


# Create your models here.
def validate_not_blank(value):
    if not value.strip():
        raise ValidationError("Phone number cannot be blank.")

class Seller(models.Model):
    #admin = models.OneToOneField(django_admin, on_delete=models.CASCADE, default=None)
    #name = models.CharField(max_length=50)
    #password = models.CharField(max_length=50, unique=True)
    #email = models.EmailField(max_length=50,unique=True)
    phone_regex = RegexValidator(regex=r'^\d+$', message="Phone number must contain only numbers.")
    phone = models.CharField(max_length=50, unique=True, validators=[phone_regex, validate_not_blank])
    admin_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    department = models.CharField(max_length=50)
    cash_balance = models.CharField(max_length=50)

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,default=None,primary_key=True)
    phone_regex = RegexValidator(regex=r'^\d+$', message="Phone number must contain only numbers.")
    phone = models.CharField(max_length=50, unique=True, validators=[phone_regex, validate_not_blank])
    #Customer_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    

    # @receiver(post_save, sender=User)
    # def create_user_profile(sender, instance, created, **kwargs):
    #  if created:
    #     Customer.objects.create(user=instance)

    # @receiver(post_save, sender=User)
    # def save_user_profile(sender, instance, **kwargs):
    #  instance.profile.save()

class Payment(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    method = models.CharField(max_length=50)
    amount = models.CharField(max_length=50)

class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    Order_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    Delivery_date = models.DateField()
    Order_date = models.DateTimeField(auto_now_add=True)
    Complain = models.TextField()
    address = models.TextField(default='', null=False)

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField(default=100)
    Type = models.CharField(max_length=50 )
    #new_id = models.AutoField(primary_key=True) el mfrod yb2a kda 3shan y3ml increment l integers mn 1
    Product_id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    quantity = models.IntegerField(default=1)
    # fadel image
    picture = models.ImageField(upload_to="img",default="")
    #Description 
    description = models.TextField(default='')

class Cart(models.Model):
    Cart_id = models.UUIDField(default=uuid.uuid4(), editable=False, primary_key=True, unique=True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)


class Category(models.Model):
    name = models.CharField(default='', primary_key=True, unique=True, max_length=200) #primary key
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

class update(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    seller = models.ForeignKey(Seller, default=None, on_delete=models.CASCADE)
    sold_quantity = models.IntegerField(default=1)
    remaining_quantity = models.IntegerField(default=1)


class contain (models.Model):
    Order = models.ForeignKey(Order, on_delete=models.CASCADE)
    Product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

