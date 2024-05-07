@echo off
echo Creating virtual environment...
echo.
echo.
pip install virtualenv
pip install virtualenvwrapper-win
python -m virtualenv venv
echo.
echo.
echo Activating virtual environment...
echo.
echo.
call venv\Scripts\activate.bat
echo.
echo.
echo Installing dependencies...
echo.
echo.
pip install django
pip install djangorestframework
pip install django-widget-tweaks
pip install Pillow
pip install mysqlclient
python manage.py makemigrations
python manage.py migrate
echo.
echo.
echo Setup complete.
echo.
pause