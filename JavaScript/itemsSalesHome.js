/***************************************************************************************************** */
fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    //to get sales products
    const item_sale = document.getElementById("item_sale");
    all_products_json = data;
    data.products.forEach((product) => {
      if (product.discountPercentage) {
        item_sale.innerHTML += `
                        <div class="product">
                        <div class="icons">
                            <span> <i onclick="addToCard(${
                              product.id
                            },this)"  class="fa-solid fa-cart-shopping"></i></span>
                            <span> <i class="fa-solid fa-heart"></i></span>
                            <span> <i class="fa-solid fa-share"></i></span>
                        </div>

                        <span style="color: black; border: 1px solid black;" class="sale_perset">${
                          product.discountPercentage
                        }%</span>

                        <div class="img_product">
                            <img src="${product.thumbnail}" alt="${
          product.title
        }">
                            <!-- <img class="img_hover" src="img/product/product-2.jpg" alt="">-->
                        </div>


                        <h3 onclick='moveToProductDetail()' class="name_product">
                            <a href="#">${product.title}</a>
                        </h3>

                        <div class="stars">
                            ${'<i class="fa-solid fa-star"></i>'.repeat(
                              product.rating || 5
                            )}
                        </div>

                        <div class="price">
                            <p><span>${product.price}</span></p>
                          <p class="old_price">$${(
                            product.price *
                            (1 + product.discountPercentage / 100)
                          ).toFixed(2)}</p>
                        </div>

                    </div>
  `;
      }
    });
    loadCartFromLocalStorage();
    initializeSlider();
  })
  .catch((error) => console.error("Error fetching products:", error));

//************************************************************************* */
let product_cart;
if(localStorage.getItem('products')!=null){
  product_cart=JSON.parse(localStorage.getItem('products'));

}
else{
  product_cart = [];
}
var all_products_json;
var items_in_cart = document.querySelector(".items_in_cart");


/**********************************************************************/
function loadCartFromLocalStorage() {
  let total_price = 0;
  let items_c = "";
  
  for (let i = 0; i < product_cart.length; i++) {
    items_c += `
      <div class="item_Card">
        <img src="${product_cart[i].thumbnail}" alt="">
        <div class="content">
          <h4>${product_cart[i].title}</h4>
          <p class="price_Card">${product_cart[i].price}</p>
        </div>
        <button onclick="remove_from_cart(${i})" class="delete_item"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    total_price += product_cart[i].price;
  }

  items_in_cart.innerHTML = items_c;

  price_Card_Head.innerHTML = "$" + total_price;
  count_item.innerHTML = product_cart.length;

  Price_cart_total.innerHTML = "$" + total_price;
  count_item_cart.innerHTML = `(${product_cart.length} items in cart)`;
}


/********************************************************** */

function addToCard(id, btn) {
  const product = all_products_json.products.find((prod) => prod.id === id);

  if (product) {
    product_cart.push(product);
    btn.classList.add("active");
    console.log(product_cart);
   
    localStorage.setItem("products",JSON.stringify(product_cart))

    getCartItems();
  } else {
    console.error("Product not found with id:", id);
  }
}

/** increase the total Price andd count in header */
var count_item =
  document.querySelector(".count_item"); /** increase counter in cart in head */
var price_Card_Head =
  document.querySelector(
    ".price_Card_Head"
  ); /** increase price in cart in head */
/** increase the total Price andd count in the right cart */
var count_item_cart = document.querySelector(".count_item_cart");
var Price_cart_total = document.querySelector(".Price_cart_total");

function getCartItems() {
  let total_price = 0; /** increase price in cart */

  let items_c = "";
  for (let i = 0; i < product_cart.length; i++) {
    items_c += `
    <div class="item_Card">
                <!--photo-->
                <img src="${product_cart[i].thumbnail}" alt="">
                <!--detail about product and hos price-->
                <div class="content">
                    <h4 >${product_cart[i].title}</h4>
                    <p class="price_Card">${product_cart[i].price}</p>
                </div>
                <!--button to delete product-->
                <button onclick="remove_from_cart(${i})"  class="delete_item"><i class="fa-solid fa-trash"></i></button>
            </div>
    
    `;

    total_price += product_cart[i].price; /** increase price in cart */
  }
  items_in_cart.innerHTML = items_c;

  /** increase the total Price andd count in header */
  price_Card_Head.innerHTML = "$" + total_price; /** increase price in cart */
  count_item.innerHTML = product_cart.length;

  /** increase the total Price andd count in the right cart */
  Price_cart_total.innerHTML = "$" + total_price;
  count_item_cart.innerHTML = `(${product_cart.length}item in card)`;
}

/************************************************************************************************* */
/* remove the product from cart */
//************************************************************************************************* */
/*
function remove_from_cart(index) {
  product_cart.splice(index, 1);

  getCartItems();

  let addToCardButtons = document.querySelectorAll(".fa-cart-shopping");

  for (let i = 0; i < addToCardButtons.length; i++) {
    addToCardButtons[i].classList.remove("active");

    product_cart.forEach((product) => {
      if (product.id === all_products_json.products[i].id) {
        addToCardButtons[i].classList.add("active");
      }
    });
  }
}
*/
function remove_from_cart(index) {
  product_cart.splice(index, 1);

  getCartItems();

  localStorage.setItem("products", JSON.stringify(product_cart));

  let addToCardButtons = document.querySelectorAll(".fa-cart-shopping");

  for (let i = 0; i < addToCardButtons.length; i++) {
    addToCardButtons[i].classList.remove("active");

    product_cart.forEach((product) => {
      if (product.id === all_products_json.products[i].id) {
        addToCardButtons[i].classList.add("active");
      }
    });
  }
}


/*************************************************************************** */
//function search 
/****************************************************************************** */
function searchProduct(item) {
  var containerDisplayProducts = ``;
  for (var i = 0; i < all_products_json.products.length; i++) {
    if (all_products_json.products[i].title.toLowerCase().startsWith(item.toLowerCase())) {
      containerDisplayProducts+= `
                        <div class="product">
                        <div class="icons">
                            <span> <i onclick="addToCard(${
                              all_products_json.products[i].id
                            },this)"  class="fa-solid fa-cart-shopping"></i></span>
                            <span> <i class="fa-solid fa-heart"></i></span>
                            <span> <i class="fa-solid fa-share"></i></span>
                        </div>

                        <span style="color: black; border: 1px solid black;" class="sale_perset">${
                          all_products_json.products[i].discountPercentage
                        }%</span>

                        <div class="img_product">
                        <img src="${all_products_json.products[i].thumbnail}" alt="${all_products_json.products[i].title}">
                        </div>


                        <h3 onclick='moveToProductDetail()' class="name_product">
                            <a href="#">${all_products_json.products[i].title}</a>
                        </h3>

                        <div class="stars">
                            ${'<i class="fa-solid fa-star"></i>'.repeat(
                              all_products_json.products[i].rating || 5
                            )}
                        </div>

                        <div class="price">
                            <p><span>${all_products_json.products[i].price}</span></p>
                          <p class="old_price">$${(
                            all_products_json.products[i].price *
                            (1 + all_products_json.products[i].discountPercentage / 100)
                          ).toFixed(2)}</p>
                        </div>

                    </div>
  `;
    }
  }
  document.getElementById("item_sale").innerHTML = containerDisplayProducts;

}


/*************************************************************************************** */
//filter by category
/*************************************************************************************** */
function filterByCategory(category) {
  var containerDisplayProducts = ``;

  for (var i = 0; i < all_products_json.products.length; i++) {
    if (all_products_json.products[i].category.toLowerCase() === category.toLowerCase()) {
      containerDisplayProducts += `
        <div class="product">
          <div class="icons">
            <span> <i onclick="addToCard(${all_products_json.products[i].id},this)" class="fa-solid fa-cart-shopping"></i></span>
            <span> <i class="fa-solid fa-heart"></i></span>
            <span> <i class="fa-solid fa-share"></i></span>
          </div>

          <span style="color: black; border: 1px solid black;" class="sale_perset">${all_products_json.products[i].discountPercentage || 0}%</span>

          <div class="img_product">
            <img src="${all_products_json.products[i].thumbnail}" alt="${all_products_json.products[i].title}">
          </div>

          <h3 onclick="moveToProductDetail()" class="name_product">
            <a href="#">${all_products_json.products[i].title}</a>
          </h3>

          <div class="stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(all_products_json.products[i].rating || 5)}
          </div>

          <div class="price">
            <p><span>${all_products_json.products[i].price}</span></p>
            <p class="old_price">$${(all_products_json.products[i].price * (1 + all_products_json.products[i].discountPercentage / 100)).toFixed(2)}</p>
          </div>

        </div>
      `;
    }
  }
  document.getElementById("item_sale").innerHTML = containerDisplayProducts;

}
