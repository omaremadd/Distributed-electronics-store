var productHolder = document.getElementById('productholder');
var products = [];
async function getproducts(){
    var response = await fetch(`http://127.0.0.1:8000/API/products/?format=json`);
    var finalResponse = await response.json();
    // console.log(finalResponse[0].image);
    products = finalResponse;
    displayproducts();
    // attachEvListener();
}
getproducts();

function cart_disabled(stock) {
    if (stock == 0) {
        return "disabled";
    }
    return "";
}

function cart_text(stock) {
    if (stock == 0) {
        return "Out of Stock";
    }
    return "Add to Cart";
}

function displayproducts(){
    var productCard =``;
    for(var i=0;i<products.length;i++){
        productCard+=`<div class="col-6 col-sm-3 mx-3 mb-6 float-on-hover-card">
        <a href="product/${products[i].Product_id}" class="card-link link-underline link-underline-opacity-0">
          <div class="card text-start">
            <img class="card-img-top" src="https://placehold.co/600x400" alt="${products[i].name}" />
            <div class="card-body">
              <h4 class="card-title">${products[i].name}</h4>
              <p class="card-text">
                <!-- <span class="placeholder col-7"></span> -->
                <span class="">${products[i].quantity} left in stock</span><br>
                <span class="">${products[i].price} EGP</span>
              </p>
              <button class="btn btn-primary col-5 ${cart_disabled(products[i].quantity)}" style="width:120px;">${cart_text(products[i].quantity)}</button>
            </div>
          </div>
        </a>
        </div>`
    }
    productHolder.innerHTML=productCard;
}



// function attachEvListener(){
//     for (var i=0;i<products.length;i++){
//         (function(category) {
//             var card = document.getElementById(category.Product_id);
//             card.addEventListener('click', function(ev) {
//                 console.log(category.name);
//                 sessionStorage.setItem('title',category.name);
//                 navigateToCategory();

//             });
//         })(products[i]);
//     }
//     // console.log(categoryCards);
    
// }

// function navigateToCategory(){
    
//     window.location.href="category.html";
   
   
// }