var userTable = document.getElementById('userTable');
var username = document.getElementById('username');
var email = document.getElementById('email');
var user = null;
var numProducts = 0;
async function getuser() {
    var response = await fetch(`http://${window.location.host}/API/profile/?format=json`);
    var finalResponse = await response.json();
    console.log(finalResponse.username);
    user = finalResponse;
    displayUser();
}
getuser();
function getNumProducts(orders) {
    numProducts = 0;
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].items.length; j++) {
            if (orders[i].items[j].product.id > numProducts) {
                numProducts = orders[i].items[j].product.id;
            }
        }
    }
    numProducts;
}


async function getOrders() {
    var response = await fetch(`http://${window.location.host}/API/orders/?format=json`);
    var orders = await response.json();
    console.log(orders);
    getNumProducts(orders);
    var product_counts = new Array(numProducts).fill(0);
    console.log(product_counts.length);
    var total_balance = 0;
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].items.length; j++) {
            product_counts[orders[i].items[j].product.id - 1] += orders[i].items[j].quantity;
        }
        // iterate over products in the order to calculate total balance
        for (let j = 0; j < orders[i].items.length; j++) {
            total_balance += orders[i].items[j].quantity * orders[i].items[j].price;
        }
    }
    // set balance
    document.getElementById('balance').innerText = total_balance;
    console.log(product_counts);
    displayOrders(orders);
    displaySoldItems(product_counts, orders);
}

getOrders();
function displayUser() {
    username.innerHTML = user.username;
    email.innerHTML = user.email;
}


async function displaySoldItems(product_counts, orders) {
    var response = await fetch(`http://${window.location.host}/API/products/?format=json`);
    var products = await response.json();
    console.log(products);

    for (let i = 0; i < numProducts; i++) {
        // get most sold product
        var most_sold_index = -1;
        var most_sold_quantity = 0;
        for (let j = 0; j < numProducts; j++) {
            if (product_counts[j] > most_sold_quantity) {
                most_sold_index = j;
                most_sold_quantity = product_counts[j];
            }
        }
        if (most_sold_quantity == 0) {
            break;
        }
        // display product j
        let product = products.find(p => p.id === most_sold_index + 1);
        let most_sold_li = document.createElement('li');
        most_sold_li.className = 'list-group-item';
        most_sold_li.innerHTML = `<a href="http://${window.location.host}/product/${most_sold_index + 1}/" class="link-underline link-underline-opacity-0">${product.name} <span class="badge rounded-pill text-bg-primary">${product_counts[most_sold_index]}</span></a>`;
        document.getElementById('most-sold').appendChild(most_sold_li);
        product_counts[most_sold_index] = 0;
    }
}

function displayOrders(orders) {
    // document.getElementById('order-count').innerText = orders.length;
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