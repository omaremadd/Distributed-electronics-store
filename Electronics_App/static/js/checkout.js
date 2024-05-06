var add1 = document.getElementById('add1');
var add2 = document.getElementById('add2');
var landmark = document.getElementById('landmark');
var building = document.getElementById('building');
var apartment = document.getElementById('apartment');
var city = document.getElementById('city');
var zip = document.getElementById('zip');
var terms_conditions_check = document.getElementById('terms-conditions-check');
document.addEventListener('DOMContentLoaded', function() {
  form = document.querySelector('form');
  var user = null;
  async function getuser() {
    var response = await fetch(`http://${window.location.host}/API/profile/?format=json`);
    var finalResponse = await response.json();
    console.log(finalResponse.username);
    user = finalResponse;
    var fname = document.getElementById('fname');
    fname.value = user.first_name;
    var lname = document.getElementById('lname');
    lname.value = user.last_name;
    var phone = document.getElementById('phone');
    phone.value = user.phone;
  }
  getuser();
  productsInCart = [];
  (function getProductsInCart(){
    var product = null;
    for(var i=0 ; i<sessionStorage.length ;i++){
        if (sessionStorage.key(i).includes('cart-quantity')) {
          continue;
        }
        productsInCart.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    }
    console.log(productsInCart);
  })();
  let total_price = 0;
  for (let i = 0; i < productsInCart.length; i++) {
    let product_tr = document.createElement('tr');
    product_qty = sessionStorage.getItem(`cart-quantity-${i}`);
    if (product_qty == null) {
      product_qty = 1;
    }
    product_tr.innerHTML = `
      <td>${productsInCart[i].name}</td>
      <td>${product_qty}</td>
      <td>${productsInCart[i].price * product_qty} EGP</td>
    `;
    document.getElementById('cart-summary').appendChild(product_tr);
    total_price += productsInCart[i].price * product_qty;
  }
  let total_price_tr = document.createElement('tr');
  total_price_tr.innerHTML = `
    <td colspan="2"><strong>Total</strong></td>
    <td>${total_price} EGP</td>
  `;
  document.getElementById('cart-summary').appendChild(total_price_tr);
});

function form_submit() {
  if (add1.value == '') {
    alert('Address Line 1 is required');
    return;
  } else if (building.value == '') {
    alert('Building is required');
    return;
  } else if (city.value == '') {
    alert('City is required');
    return;
  } else if (zip.value == '') {
    alert('Zip is required');
    return;
  } else if (!terms_conditions_check.checked) {
    alert('Please accept the terms and conditions');
    return;
  }
  
  var order = {}
  order.address = 'Address Line 1: ' + add1.value
   + '\nAddress line 2:' + add2.value
   + '\nLandmark: ' + landmark.value
   + '\nBuilding: ' + building.value
   + '\nApartment: ' + apartment.value
   + '\nCity: ' + city.value
   + '\nZip: ' + zip.value;
  
  order.items = [];
  for (let i = 0; i < productsInCart.length; i++) {
    const product = productsInCart[i];
    var item = {};
    item.product = product.id;
    let quantity = sessionStorage.getItem(`cart-quantity-${i}`);
    if (quantity == null) {
      quantity = 1;
    }
    item.quantity = Number(quantity);
    order.items.push(item);
  }
  if (order.items.length == 0) {
    alert('Cart is empty');
    return;
  }

  // Get the CSRF token from the cookie
  const csrfToken = getCookie('csrftoken');

  fetch(`http://${window.location.host}/API/placeOrder/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken // Add the CSRF token to the headers
    },
    body: JSON.stringify(order)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Order created:', data);
      // Handle the response data as needed
      window.location.pathname = '/profile'
      for (let i = 0; i < sessionStorage.length; i++) {
        sessionStorage.removeItem(sessionStorage.key(i));
      }
    })
    .catch(error => {
      console.error('Error creating order:', error);
      // Display a bootstrap alert to the user
      alert('Error creating order');
      window.location.pathname = '/';
    });

// Function to get the value of a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

};