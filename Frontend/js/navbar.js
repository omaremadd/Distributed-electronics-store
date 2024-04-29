document.addEventListener('DOMContentLoaded', function() {
    var header = document.createElement('header');
    header.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Electronics store</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="../html/home.html">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                All Products
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Laptops</a></li>
                                <li><a class="dropdown-item" href="#">IPhones</a></li>
                                <li><a class="dropdown-item" href="#">Accessories</a></li>
                                <li><a class="dropdown-item" href="#">Laptops</a></li>
                                <li><a class="dropdown-item" href="#">IPhones</a></li>
                                <li><a class="dropdown-item" href="#">Accessories</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="navbar-nav me-1 mb-2 mb-lg-auto align-center">
                        <li class="nav-item mx-lg-2">
                            <form class="d-flex input-group" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" aria-describedby="search-addon">
                                <button class="btn btn-outline-light" id="search-addon" type="submit">
                                    <!-- Search Icon -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                    </svg>
                                </button>
                            </form>
                        </li>
                        <li class="nav-item mx-lg-2">
                            <a class="nav-link active" href="#">Profile</a>
                        </li>
                        <li class="nav-item mx-lg-2">
                            <button class="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#Id1" aria-controls="Id1">
                                <!-- Cart icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket3-fill" viewBox="0 0 16 16">
                                    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z"/>
                                </svg>
                                <span class="d-lg-none">Cart</span>
                            </button>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    `;

    document.body.insertBefore(header, document.body.firstChild);
});

document.addEventListener('DOMContentLoaded', function() {
    var offcanvas = document.createElement('div');
    offcanvas.className = 'offcanvas offcanvas-end';
    offcanvas.setAttribute('data-bs-scroll', 'true');
    offcanvas.setAttribute('tabindex', '-1');
    offcanvas.setAttribute('id', 'Id1');
    offcanvas.setAttribute('aria-labelledby', 'Enable both scrolling & backdrop');
    offcanvas.innerHTML = `
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="Enable both scrolling & backdrop">
                Backdrop with scrolling
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p>
                Try scrolling the rest of the page to see this option in action.
            </p>
        </div>
    `;

    var mainTag = document.querySelector('main');
    mainTag.insertBefore(offcanvas, mainTag.firstChild);
});