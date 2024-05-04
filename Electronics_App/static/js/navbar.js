document.addEventListener('DOMContentLoaded',function(){
    var categories = [];
    var categoryDropDown =this.getElementById('cat-dropdown');
    async function getCategories(){
        var response = await fetch('http://127.0.0.1:8000/API/categories/?format=json');
        var finalresponse = await response.json();
        categories = finalresponse;
        console.log(categories);
        addCategories();
    }
        getCategories();
       
    function addCategories(){
        var categHolder = ``;
        for(var i=0;i<categories.length;i++){
            categHolder+=`<li id="${categories[i].id}"><a class="dropdown-item" href="category/${categories[i].id}">${categories[i].title}</a></li>`;
        }
        categoryDropDown.innerHTML=categHolder;
    }
        
    
});


    