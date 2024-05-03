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
function displayCategories(){
    var categoryCard =``;
    for(var i=0;i<categories.length;i++){
        categoryCard+=`<div id="${categories[i].Product_id}" class="col-6 col-sm-3 float-on-hover">
        <a href="#" class="card-link link-underline link-underline-opacity-0">
            <div class="card text-start">
                <img class="card-img-top" src="#" alt="${categories[i].name}" />
                <div class="card-body">
                    <h4 id="title" class="card-title ">${categories[i].name}</h4>
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