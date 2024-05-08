@echo off
echo Activating virtual environment...
echo.
call venv\Scripts\activate.bat
echo Starting server...
echo.
echo.
start "Serving static files" call python -m http.server --directory electronics_app/static 8564
python manage.py runserver %1