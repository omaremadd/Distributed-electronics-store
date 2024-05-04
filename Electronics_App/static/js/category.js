var category_id = Number(window.location.href.split("/").pop());
// var title  = sessionStorage.getItem('title');
var category = {};
var productHolder=document.getElementById('productHolder');
async function getProducts(){
  var response = await fetch(`http://${window.location.host}/API/categories/${category_id}/?format=json`);
  var finalResponse = await response.json();
  // console.log(finalResponse[0].image);
  category = finalResponse;
  displayProducts();
  // attachEvListener();
  document.getElementById('categoryTitle').innerHTML=category.title;
  document.getElementsByTagName('title')[0].innerHTML=category.title;
}
getProducts();
function displayProducts(){
    var productCard =``;
    for(var i=0;i<category.products.length;i++){
      img_name=category.products[i].picture.split('/').pop();
        productCard+=`<div class="col-6 col-sm-3 mx-3 mb-6 float-on-hover-card">
        <a href="../product/${category.products[i].id}" class="card-link link-underline link-underline-opacity-0">
          <div class="card text-start">
            <img class="card-img-top" src="http://${window.location.host}/static/img/${img_name}" alt="${category.products[i].description}" style="height:200px; width:100%;object-fit: contain;"/>
            <div class="card-body">
              <h4 class="card-title">${category.products[i].name}</h4>
              <p class="card-text">
                <!-- <span class="placeholder col-7"></span> -->
                <span class="">${category.products[i].quantity} left in stock</span><br>
                <span class="">${category.products[i].price} EGP</span>
              </p>
              <button class="btn btn-primary col-5 ${cart_disabled(category.products[i].quantity)}" style="width:120px;">${cart_text(category.products[i].quantity)}</button>
            </div>
          </div>
        </a>
        </div>`
    }
    productHolder.innerHTML=productCard;
}

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