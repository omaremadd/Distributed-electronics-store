# Distributed electronics store
 
## Requirements (First time only):
1. Install Python
2. Install [Xampp](https://www.apachefriends.org/)
   1. Start Apache server
   2. Start MySQL server
      1. Open [this link](http://localhost/phpmyadmin)
      2. Create a new database called `shop_django`
3. Open up a Command Prompt (not PowerShell!)
4. Run the following commands from the repo directory:
```cmd
1-make-venv.bat
```
```cmd
2-activate-venv.bat
```
```cmd
3-setup-venv.bat
```
---
## To run the server:
- Run Xampp (skip these steps if it's already running)
  - Start Apache server
  - Start MySQL server
- Make sure the virtual environment is activated (batch file 2), then run this command
```cmd
python manage.py runserver
```
