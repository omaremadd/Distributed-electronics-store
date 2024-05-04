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

function shortenText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

function displayCartProducts(){
    var holder = ``
    var totalPrice=0;
    for(var i = 0 ; i<productsInCart.length ; i++ ){
        var img_name = productsInCart[i].picture.split('/').pop();
        totalPrice+=Number(productsInCart[i].price);
        holder+=`<div  class="container-fluid border-top p-2 placeholder-glow d-flex" style="height: 100px; align-content: center">
        <img src="http://${window.location.host}/static/img/${img_name}" alt="${productsInCart[i].name}" style="width: 80px; height: 80px;">
        <div class="container-fluid col">
            <div class="row">
                <strong class="" style="font-size: large;">${productsInCart[i].name}</strong>
            </div>
            <div class="row">
                <span class="">${shortenText(productsInCart[i].description,30)}</span>
            </div>
            <div class="row">
                <div class="col">
                    <div class="input-group input-group-sm">
                        <button class="input-group-text" id="minus-addon-${productsInCart[i].id}">-</button>
                        <span id="quantity-${productsInCart[i].id}" class="border" aria-describedby="minus-addon-0 plus-addon-0" style="width: 30px;text-align: center;">1</span>
                        <button class="input-group-text" id="plus-addon-${productsInCart[i].id}">+</button>
                    </div>
                </div>
                <div class="col text-end">
                    <span class="text-secondary"><span class="">${productsInCart[i].price}</span> EGP</span>
                </div>
            </div>
        </div>
    </div>`;
    }
    cartProduct.innerHTML=holder +`<div class="container-fluid border-top p-2 placeholder-glow d-flex" style="height: 100px; align-content: center;">
    <div class="container-fluid col">
        <div class="row">
            <strong class="" style="font-size: large;">Total</strong>
        </div>
        <div class="row">
            <div class="col text-end">
                <span class="text-secondary"><span id="total-price" class="">${totalPrice}</span> EGP</span>
            </div>
        </div>
        <div class="row">
            <a href="../html/checkout.html" class="btn btn-primary">Checkout</a>
        </div>
    </div>
</div>` ;
}
displayCartProducts();
attachEvListener();
function attachEvListener(){
    for(let i=0 ; i<productsInCart.length;i++){
        let span = document.getElementById(`quantity-${productsInCart[i].id}`);
        let plusButton = document.getElementById(`plus-addon-${productsInCart[i].id}`);
        let minusButton = document.getElementById(`minus-addon-${productsInCart[i].id}`);
        let total = document.getElementById('total-price');
        minusButton.addEventListener('click',function(){
            let quant = Number(span.innerHTML);
            if(quant>=2){
            span.innerHTML=(quant-1).toString();
            total.innerHTML=(Number(total.innerHTML)-Number(productsInCart[i].price));
            }
            else if(quant==1){
                span.innerHTML=(quant-1).toString();
                sessionStorage.removeItem(productsInCart[i].id);
                total.innerHTML=(Number(total.innerHTML)-Number(productsInCart[i].price));
                window.location.reload();
            }

        });
        plusButton.addEventListener('click',function(){
            let quant = Number(span.innerHTML);
            if(quant < productsInCart[i].quantity){
            span.innerHTML=(quant+1).toString();
             total.innerHTML=(Number(total.innerHTML)+Number(productsInCart[i].price));

            }
        });
    }
}