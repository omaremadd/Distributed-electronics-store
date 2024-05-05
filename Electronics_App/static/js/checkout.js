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
    var add1 = document.getElementById('add1');
    var add2 = document.getElementById('add2');
    var landmark = document.getElementById('landmark');
    var building = document.getElementById('building');
    var apartment = document.getElementById('apartment');
    var city = document.getElementById('city');
    var zip = document.getElementById('zip');
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
});

function form_submit() {
  
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