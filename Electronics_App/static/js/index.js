var categoryHolder = document.getElementById('categoryholder');
var categories = [];
async function getcategories(){
    var response = await fetch(`http://127.0.0.1:8000/API/products/?format=json`);
    var finalResponse = await response.json();
    // console.log(finalResponse[0].image);
    categories = finalResponse;
    displayCategories();
    attachEvListener();
}
getcategories();

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

function displayCategories(){
    var categoryCard =``;
    for(var i=0;i<categories.length;i++){
        categoryCard+=`<div class="col-6 col-sm-3 mx-3 mb-6 float-on-hover-card">
        <a href="product/${categories[i].Product_id}" class="card-link link-underline link-underline-opacity-0">
          <div class="card text-start">
            <img class="card-img-top" src="https://placehold.co/600x400" alt="${categories[i].name}" />
            <div class="card-body">
              <h4 class="card-title">${categories[i].name}</h4>
              <p class="card-text">
                <!-- <span class="placeholder col-7"></span> -->
                <span class="">${categories[i].quantity} left in stock</span><br>
                <span class="">${categories[i].price} EGP</span>
              </p>
              <button class="btn btn-primary col-5 ${cart_disabled(categories[i].quantity)}" style="width:120px;">${cart_text(categories[i].quantity)}</button>
            </div>
          </div>
        </a>
        </div>`
    }
    categoryHolder.innerHTML=categoryCard;
}



function attachEvListener(){
    for (var i=0;i<categories.length;i++){
        (function(category) {
            var card = document.getElementById(category.Product_id);
            card.addEventListener('click', function(ev) {
                console.log(category.name);
                sessionStorage.setItem('title',category.name);
                navigateToCategory();

            });
        })(categories[i]);
    }
    // console.log(categoryCards);
    
}

function navigateToCategory(){
    
    window.location.href="category.html";
   
   
}