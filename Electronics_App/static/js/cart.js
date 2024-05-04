var productsInCart = [];
var cartProduct = document.getElementById('cart-product');
console.log(cartProduct);
(function getProductsInCart(){
    var product = null;
    for(var i=0 ; i<sessionStorage.length ;i++){
        productsInCart.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    }
    console.log(productsInCart);
})();

function displayCartProducts(){
    var holder = ``
    for(var i = 0 ; i<productsInCart.length ; i++ ){
        var img_name = productsInCart[i].picture.split('/').pop();
        holder+=`<div  class="container-fluid border-top p-2 placeholder-glow d-flex" style="height: 100px; align-content: center">
        <img src="http://${window.location.host}/static/img/${img_name}" alt="${productsInCart[i].name}" style="width: 80px; height: 80px;">
        <div class="container-fluid col">
            <div class="row">
                <strong class="" style="font-size: large;">${productsInCart[i].name}</strong>
            </div>
            <div class="row">
                <span class="">${productsInCart[i].description}</span>
            </div>
            <div class="row">
                <div class="col">
                    <div class="input-group input-group-sm">
                        <button class="input-group-text" id="minus-addon-0">-</button>
                        <span class="border" aria-describedby="minus-addon-0 plus-addon-0" style="width: 30px;text-align: center;">1</span>
                        <button class="input-group-text" id="plus-addon-0">+</button>
                    </div>
                </div>
                <div class="col text-end">
                    <span class="text-secondary"><span class="">123.45</span> EGP</span>
                </div>
            </div>
        </div>
    </div>`
    }
    cartProduct.innerHTML=holder ;
}
displayCartProducts();