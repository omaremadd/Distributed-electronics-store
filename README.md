# Distributed electronics store
 
## Requirements (First time only):
1. Install Python
2. Install [Xampp](https://www.apachefriends.org/)
   1. Start Apache server
   2. Start MySQL server
      1. Open [this link](http://localhost/phpmyadmin)
      2. Create a new database called `shop_django` and import an existing `shop_django.sql` if available
3. Execute the `setup.bat` batch file (Internet connection required)
---
## To run the server:
- Run Xampp (skip these steps if it's already running)
  - Start Apache server
  - Start MySQL server
- Execute `runserver.bat`
> `runserver.bat` takes an *optional* command line argument (IP:Port).  
> e.g. 
> ```runserver.bat 127.0.0.1:8000```