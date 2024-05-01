import uuid
from django.conf import settings
from django.core.exceptions import ValidationError, PermissionDenied
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import User

#from Electronics_App import admin           ########makes a circular import error


# Create your models here.
def validate_not_blank(value):
    if not value.strip():
        raise ValidationError("Phone number cannot be blank.")

class admin(models.Model):
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50,unique=True)
    phone_regex = RegexValidator(regex=r'^\d+$', message="Phone number must contain only numbers.")
    phone = models.CharField(max_length=50, unique=True, validators=[phone_regex, validate_not_blank])
    Admin_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    department = models.CharField(max_length=50)

class Customer(models.Model):
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    phone_regex = RegexValidator(regex=r'^\d+$', message="Phone number must contain only numbers.")
    phone = models.CharField(max_length=50, unique=True, validators=[phone_regex, validate_not_blank])
    Customer_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    balance = models.CharField(max_length=50) # Edit later
    address = models.TextField()

class Payment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    payment_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    method = models.CharField(max_length=50)
    amount = models.CharField(max_length=50)

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField(default=100)
    Type = models.CharField(max_length=50 )
    #new_id = models.AutoField(primary_key=True) el mfrod yb2a kda 3shan y3ml increment l integers mn 1
    Product_id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    quantity = models.IntegerField(default=1)
    # fadel image

class update(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE);
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE);

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    Order_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    Delivery_date = models.DateField()
    Order_date = models.DateTimeField(auto_now_add=True)
    Complain = models.TextField()

class contain (models.Model):
    Order = models.ForeignKey(Order, on_delete=models.CASCADE)
    Product = models.ForeignKey(Product, on_delete=models.CASCADE)

