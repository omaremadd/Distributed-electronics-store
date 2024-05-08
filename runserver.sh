#!/bin/bash

echo "Activating virtual environment..."
echo
source venv/bin/activate
echo "Starting server..."
echo
echo
python -m http.server --directory electronics_app/static 8564 &
venv/bin/python manage.py runserver $1