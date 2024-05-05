var userTable = document.getElementById('userTable');
var username = document.getElementById('username');
var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var email = document.getElementById('email');
var phone = document.getElementById('phone');
var pastOrders = document.getElementById('pastOrders');
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
    firstname.innerHTML = user.first_name;
    lastname.innerHTML = user.last_name;
    phone.innerHTML = `+20${user.phone}`;
}

async function getOrders() {
    var response = await fetch(`http://${window.location.host}/API/myOrders/?format=json`);
    var finalResponse = await response.json();
    console.log(finalResponse);
    displayOrders(finalResponse);
}

getOrders();
function displayOrders(orders) {
    document.getElementById('order-count').innerText = orders.length;
    for (let i = 0; i < orders.length; i++) {
        var order_li = document.createElement('li');
        order_li.className = 'list-group-item d-flex justify-content-between align-items-center';
        let order_ul = document.createElement('ul');
        order_li.appendChild(order_ul);
        let date_li = document.createElement('li');
        let order_date = new Date(orders[i].Order_date);
        date_li.innerText = `Order Date: ${order_date.getDate()}/${order_date.getMonth()}/${order_date.getFullYear()}`;
        order_ul.appendChild(date_li);
        let items_li = document.createElement('li');
        items_li.innerText = `Items: ${orders[i].items.length}`;
        order_ul.appendChild(items_li);
        let items_ul = document.createElement('ul');

        for (let j = 0; j < orders[i].items.length; j++) {
            let item_li = document.createElement('li');

            item_li.innerHTML = `<a href="http://${window.location.host}/product/${orders[i].items[j].product.id}/">${orders[i].items[j].quantity}x ${orders[i].items[j].product.name}: ${orders[i].items[j].quantity * orders[i].items[j].price} EGP</a>`;
            items_ul.appendChild(item_li);
        }
        items_li.appendChild(items_ul);
        let total_li = document.createElement('li');
        let order_total = 0;
        for (let j = 0; j < orders[i].items.length; j++) {
            order_total += orders[i].items[j].quantity * orders[i].items[j].price;
        }
        total_li.innerText = `Total: ${order_total} EGP`;
        order_ul.appendChild(total_li);

        document.getElementById('pastOrders').appendChild(order_li);
    }
}