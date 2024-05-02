from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=255, help_text='Required. Inform a valid email address.')
    phone = forms.CharField(max_length=50, help_text='Required. Inform a valid phone number.')
    first_name = forms.CharField(max_length=50, help_text='Required. Inform your first name.')
    last_name = forms.CharField(max_length=50, help_text='Required. Inform your last name.')
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone', 'email', 'password1', 'password2')