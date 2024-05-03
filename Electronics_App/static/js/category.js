var title  = sessionStorage.getItem('title');
var products = [];
var productHolder=document.getElementById('productHolder');
 document.getElementById('categoryTitle').innerHTML=title;
 async function getProducts(){
    var response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    var finalResponse = await response.json();
    // console.log(finalResponse[0].image);
    products = finalResponse;
    displayProducts();
    // attachEvListener();
}
getProducts();
function displayProducts(){
    var productCard =``;
    for(var i=0;i<6;i++){
        productCard+=`<div class="col-6 col-sm-3 mx-3 mb-6 float-on-hover-card">
        <a href="product.html" class="card-link link-underline link-underline-opacity-0">
          <div class="card text-start">
            <img class="card-img-top" src="${products[i].url}" alt="${products[i].title}" />
            <div class="card-body">
              <h4 class="card-title">${products[i].title}</h4>
              <p class="card-text">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
              </p>
              <button class="btn btn-primary col-5">Add to Cart</button>
            </div>
          </div>
        </a>
        </div>`
    }
    productHolder.innerHTML=productCard;
}
