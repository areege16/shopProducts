/fetch data and display*/
function fetchData(url, fun) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            fun(response.products);
            attachBuyButtonEvents();
            attachCardClickEvents(response.products); 
        }
    };
}

function displayProducts(products) {
    var cards = document.querySelector(".cards-container");
    cards.innerHTML = "";

    products.forEach(product => {
        var card = `
            <div class="card" data-id="${product.id}">
                <img src="${product.thumbnail}" class="cards" alt="${product.title}">
                <h6>${product.title}</h6>
                <p>${product.price} USD</p>
                <button class="buy">Buy Now</button>
            </div>`;
        cards.innerHTML += card;
    });
}

fetchData("https://dummyjson.com/products", displayProducts);

/*divide data to categories************************************* */
   
var arr = [
    'https://dummyjson.com/products',
    'https://dummyjson.com/products/category/beauty',
    'https://dummyjson.com/products/category/fragrances',
    'https://dummyjson.com/products/category/groceries',
    'https://dummyjson.com/products/category/furniture'
];

var categoryItems = document.querySelectorAll(".categories_list li");

categoryItems.forEach((item, index) => {
    item.addEventListener("click", function() {
        fetchData(arr[index], displayProducts);
    });
});

fetchData(arr[0], displayProducts);

/********************************************************************************************************************** */
function attachCardClickEvents(products) {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const productId = card.getAttribute('data-id');
            const product = products.find(p => p.id == productId);

            if (product) {
                showProductDetails(product);
            }
        });
    });
}
function showProductDetails(product) {
    const productDetailsContainer = document.querySelector('.product-details'); 

    productDetailsContainer.innerHTML = `
        <div class="details">
            <img src="${product.thumbnail}" alt="${product.title}" class="details-img">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ${product.price} USD</p>
            <p><strong>Discount:</strong> ${product.discountPercentage}%</p>
            <p><strong>Rating:</strong> ${product.rating}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Tags:</strong> ${product.tags.join(', ')}</p>
            <button class="close-details">Close</button>
        </div>
    `;

    productDetailsContainer.style.display = 'block'; 
    productDetailsContainer.scrollIntoView({ behavior: 'smooth' });

    const closeButton = productDetailsContainer.querySelector('.close-details');
    closeButton.addEventListener('click', function () {
        productDetailsContainer.style.display = 'none';
    });
}





function attachBuyButtonEvents() {
    const buttons = document.querySelectorAll('.buy'); 
    const quantityDisplay = document.getElementById('quantity'); 
    let cartQuantity = 0; 

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            cartQuantity++; 
            quantityDisplay.textContent = cartQuantity;
            window.alert("The Item is added");
        });
    });
}

/*slider************ */
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000);
}


function open_cart() {
    const cart = document.querySelector('.cart');
    if (!cart) {
        console.error('Cart element not found.');
        return;
    }

    const itemsContainer = document.querySelector('.items_in_cart');
    if (!itemsContainer) {
        console.error('Items container not found.');
        return;
    }

    itemsContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const itemHTML = `
            <div class="item_Card" >
                <img src="${item.thumbnail}" alt="${item.title}" style="width:50px; height:50px; margin-right:10px;">
                <div class="content">
                    <h4>${item.title}</h4>
                    <p class="price_Card">${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button class="delete_item" data-index="${index}">Remove</button>
            </div>
            <br>`;
        itemsContainer.innerHTML += itemHTML;
    });

    attachRemoveButtonEvents();
    cart.classList.add('active');
}

function close_cart() {
    const cart = document.querySelector('.cart');
    if (!cart) {
        console.error('Cart element not found.');
        return;
    }
    cart.classList.remove('active');
}

function attachRemoveButtonEvents() {
    const removeButtons = document.querySelectorAll('.delete_item');

    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemIndex = button.getAttribute('data-index');
            cartItems.splice(itemIndex, 1); 
            updateCartDisplay(); 
            setCookie('cart', JSON.stringify(cartItems), 7); 
            open_cart();
        });
    });
}

const cartItems = JSON.parse(getCookie('cart') || '[]'); 
const quantityDisplay = document.getElementById('quantity'); 

function attachBuyButtonEvents() {
    const buttons = document.querySelectorAll('.buy'); 

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = button.closest('.card');
            const title = productCard.querySelector('h6').textContent;
            const price = productCard.querySelector('p').textContent;
            const thumbnail = productCard.querySelector('img').src;

            const existingItem = cartItems.find(item => item.title === title);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({
                    title,
                    price,
                    thumbnail,
                    quantity: 1,
                });
            }

            updateCartDisplay();
            setCookie('cart', JSON.stringify(cartItems), 7); 
        });
    });
}

function updateCartDisplay() {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (quantityDisplay) {
        quantityDisplay.textContent = totalQuantity;
    } else {
        console.error('Quantity display element not found.');
    }
}



function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = ${name}=${value};expires=${d.toUTCString()};path=/;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=').map(c => c.trim());
        if (key === name) return value;
    }
    return null;
}

/*check the cart products************* */
var button_cart = document.querySelector(".botton_cart");

button_cart.addEventListener('click', function() {
    window.open("checkout.html", "width=600,height=400");
});