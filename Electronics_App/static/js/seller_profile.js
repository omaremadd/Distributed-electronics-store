var userTable = document.getElementById('userTable');
var username = document.getElementById('username');
var email = document.getElementById('email');
var user = null;

async function getuser() {
    var response = await fetch(`http://${window.location.host}/API/profile/?format=json`);
    var finalResponse = await response.json();
    console.log(finalResponse.username);
    user = finalResponse;
    displayUser();
}
getuser();

function displayUser() {
    username.innerHTML = user.username;
    email.innerHTML = user.email;
}
