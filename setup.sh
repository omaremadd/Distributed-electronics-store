#!/bin/bash
echo Creating virtual environment...
echo
echo
pip install virtualenv
pip install virtualenvwrapper
python3 -m venv venv
echo
echo
echo Activating virtual environment...
echo
echo
source venv/bin/activate
echo
echo
echo Installing dependencies...
echo
echo
pip install django
pip install djangorestframework
pip install django-widget-tweaks
pip install Pillow
pip install mysqlclient
venv/bin/python manage.py makemigrations
venv/bin/python manage.py migrate
echo
echo
echo Setup complete.
echo
read -p "Press Enter to exit..."