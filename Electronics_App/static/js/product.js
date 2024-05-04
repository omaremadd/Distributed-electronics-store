var link=window.location.href.split("/");
var product_id =link[link.length-2] ;
// console.log(product_id);
var product_name_tag = document.getElementById('product_name');
var productQuantity = document.getElementById('product_quantity');
var productPrice = document.getElementById('product_price');
var addButton = document.getElementById('add_btn');
var cartButton = document.getElementById('cart_btn');
var productDescription = document.getElementById('product_description');
var img = document.getElementById('product_img');
var product = null;
async function getProduct(){
    var response = await fetch(`http://${window.location.host}/API/products/${product_id}/?format=json`);
    var finalResponse = await response.json();
    product = finalResponse;
    // console.log(product);
    displayProduct();
    document.getElementsByTagName('title')[0].innerHTML=product.name;
    addToCartButton();
}
getProduct();

function displayProduct(){
    product_name_tag.classList.remove('placeholder');
    productQuantity.classList.remove('placeholder');
    productPrice.classList.remove('placeholder');
    addButton.classList.remove('placeholder');
    cartButton.classList.remove('placeholder');
    product_name_tag.innerHTML=product.name;
    productDescription.classList.remove('placeholder');
    var stock = product.quantity;
    if(stock != 0){
        productQuantity.innerHTML= `${product.quantity} in stock`;
    }
    else
    {
        productQuantity.innerHTML= `Out of Stock`;
        productQuantity.classList.add('text-danger');
        cartButton.innerHTML='Out of Stock';
        addButton.classList.replace('btn-primary','btn-secondary');
        addButton.classList.add('disabled');
    }
    productDescription.innerHTML = `<pre style="font-family: Arial, san-serif;">${product.description}</pre>`;
    productPrice.innerHTML = product.price + ' EGP';
    img.src = 'http://' + window.location.host + '/static/img/' + product.picture.split("/").pop();
    img.style = 'height:450px; width:600px; max-width:90vw ; object-fit: contain;';
}

function addToCartButton(){
    addButton.addEventListener('click',function(){
        sessionStorage.setItem(product.id,JSON.stringify(product));
        window.location.reload();
    })
}