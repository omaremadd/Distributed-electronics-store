var productHolder = document.getElementById('productholder');
var products = [];
async function getproducts(){
    var response = await fetch(`http://${window.location.host}/API/products/?format=json`);
    var finalResponse = await response.json();
    // console.log(finalResponse[0].image);
    products = finalResponse;
    displayproducts(products);
    searchProducts();
    // attachEvListener();
}

getproducts();

function stock_message(stock) {
    if (stock == 0) {
        return `<span class="text-danger">Out of stock</span>`;
    }
    return stock + " left in stock";

}

// function cart_disabled(stock) {
//     if (stock == 0) {
//         return "disabled";
//     }
//     return "";
// }

// function cart_text(stock) {
//     if (stock == 0) {
//         return "Out of Stock";
//     }
//     return "Add to Cart";
// }

function displayproducts(displayedProducts){
    var productCard =``;
    for(var i=0;i<displayedProducts.length;i++){
        var img_name = displayedProducts[i].picture.split('/').pop();
        productCard+=`<div class="col-9 col-sm-3 mx-3 mb-6 float-on-hover-card">
        <a href="product/${displayedProducts[i].id}" class="card-link link-underline link-underline-opacity-0">
          <div class="card text-start">
            <img class="card-img-top" src="http://${window.location.hostname}:8564/img/${img_name}" alt="${displayedProducts[i].name}" style="height:200px; width:100%;object-fit: contain;"/>
            <div class="card-body">
              <h4 class="card-title">${displayedProducts[i].name}</h4>
              <p class="card-text">
                <!-- <span class="placeholder col-7"></span> -->
                ${stock_message(displayedProducts[i].quantity)}<br>
                <span class="">${displayedProducts[i].price} EGP</span>
              </p>
              <button class="btn btn-primary col-5" style="width:120px;">View Details</button>
            </div>
          </div>
        </a>
        </div>`
    }
    productHolder.innerHTML=productCard;
}



var searchBtn = document.getElementById('search-addon');
var searchInput = document.getElementById('search-input');
var searchedProducts = [];
function searchProducts(){
    searchBtn.addEventListener('click',function(){
        search();
    })
    searchInput.addEventListener('keydown',function(ev){
        if(ev.key=='Enter'){
            ev.preventDefault();
            search();
        }
    })
}
function search(){
    console.log(searchData);
    var searchData = searchInput.value;
        products.forEach(item=>{
            productMatch(item,searchData);
        });
        displayproducts(searchedProducts);
        searchedProducts=[];
}
function productMatch(item,value){
    var name = item.name;
    if(name.toLowerCase().includes(value.toLowerCase())){
        searchedProducts.push(item);
    }
}