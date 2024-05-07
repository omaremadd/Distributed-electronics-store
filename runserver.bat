@echo off
echo Activating virtual environment...
echo.
call venv\Scripts\activate.bat
echo Starting server...
echo.
echo.
python manage.py runserver %1