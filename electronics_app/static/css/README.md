# Sass ([Download link](https://github.com/sass/dart-sass/releases/download/1.75.0/dart-sass-1.75.0-windows-x64.zip))

After downloading sass, add the path of [sass.bat](#) to your PATH environment variable, or you can follow these steps:  
1. Windows Search "Edit the system environment variables"
2. In the bottom right of the window, click "Environment variables"
3. In the lower half of the new window (Under system variables), select the "PATH" or "Path" variable from the list, click "Edit"
4. Now click "New" to add a new value, then paste the path to [sass.bat](#) file
5. Click OK, exit these windows and restart your terminal

---

## To use sass
Write your sass code in a scss file, then compile it using the following command:
```cmd
sass.bat <path/to/input.scss>:<path/to/output.css>
```

To make sass automatically compile any changes you make in the current session, use the following command
```cmd
sass.bat --watch <path/to/input.scss>:<path/to/output.css>
```