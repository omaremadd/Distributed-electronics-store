var link=window.location.href.split("/");
var product_id =link[link.length-2] ;
console.log(product_id);
var product_name_tag = document.getElementById('product_name');
var productQuantity = document.getElementById('product_quantity');
var productPrice = document.getElementById('product_price');
var addButton = document.getElementById('add_btn');
var product = null;
async function getProduct(){
    var response = await fetch(`http://127.0.0.1:8000/API/products/${product_id}/?format=json`);
    var finalResponse = await response.json();
    product = finalResponse;
    console.log(product);
    displayProduct();
}
getProduct();

function displayProduct(){
    product_name_tag.innerHTML=product.name;
    var stock = product.quantity;
    if(stock != 0){
        productQuantity.innerHTML= `${product.quantity} in stock`;
    }
    else
    {
        productQuantity.innerHTML= `Out of Stock`;
        productQuantity.classList.add('text-danger');
        addButton.innerHTML='Out of Stock';
        addButton.classList.replace('btn-primary','btn-secondary');
        addButton.classList.add('disabled');
    }
    productPrice.innerHTML = product.price + ' EGP';
}