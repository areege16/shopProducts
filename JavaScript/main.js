//open and close the cart in page 1
var cart = document.querySelector(".cart");
function open_cart() {
  cart.classList.add("active");
}
function close_cart() {
  cart.classList.remove("active");
}
/*********************************************************** */
//slider to photo in page1
let slideIndex = 0;
const slides = document.querySelectorAll(".mySlides");

showslider();

function showslider() {
  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? "block" : "none";
  });
}

function changeSlide(n) {
  slideIndex += n;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showslider();
}
setInterval(() => {
  changeSlide(1);
}, 2000);

/************************************************************* */
/* the slider to show seles products  */
/************************************************************* */
/*
const sliderWrapper = document.querySelector(".slider-wrapper");
const products = document.querySelectorAll(".product");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

const totalProduct = products.length;

//next button
nextBtn.addEventListener("click", () => {
  if (currentIndex < totalProduct - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateSlider();
});
//prevous button
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalProduct - 1;
  }
  updateSlider();
});

function updateSlider() {
  sliderWrapper.style.transform = `translateX(-${currentIndex *25}%)`;
}
  */

/*
function initializeSlider() {
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const products = document.querySelectorAll(".product");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentIndex = 0; 
  const productsToShow = 3; 
  const productWidth = sliderWrapper.offsetWidth / productsToShow; 

  function updateSlider() {
      sliderWrapper.style.transform = `translateX(-${currentIndex * productWidth}px)`;
  }

  function nextImage() {
      if (currentIndex < products.length - productsToShow) {
          currentIndex++;
          updateSlider();
          console.log()
      }
  }

  function prevImage() {
      if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
      }
  }

  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  updateSlider();
}
*/
function initializeSlider() {
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const products = document.querySelectorAll(".product");
  const nextBtn = document.querySelectorAll(".next");
  const prevBtn = document.querySelectorAll(".prev");

  let currentIndex = 0; 
  const productsToShow = 3; 
  const productWidth = sliderWrapper.offsetWidth / productsToShow; 

  function updateSlider() {
      sliderWrapper.style.transform = `translateX(-${currentIndex * productWidth}px)`;
  }

  function nextImage() {
      if (currentIndex < products.length - productsToShow) {
          currentIndex++;
          updateSlider();
      }
      
  }

  function prevImage() {
      if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
      }
  }

  nextBtn.forEach((btn) => {
    btn.addEventListener("click", nextImage);
  });
  prevBtn.forEach((btn) => {
    btn.addEventListener("click", prevImage);
  });

  updateSlider();
}

// /***********************************************************8 */
// /* add item in cart */
// /************************************************************* */

// var all_products_json ; 

// var items_in_cart = document.querySelector(".items_in_cart");
// let product_cart=[];
// function addToCard(id,btn){
//   const product = all_products_json.products.find(prod => prod.id === id);

//   if(product){
//     product_cart.push(product);
//     btn.classList.add("active");
//     console.log(product_cart);
//     getCartItems();
//   }
//   else{
//     console.error("Product not found with id:", id);
//   }
 
// }

// /** increase the total Price andd count in header */
// var count_item=document.querySelector(".count_item");/** increase counter in cart in head */
// var price_Card_Head=document.querySelector(".price_Card_Head");/** increase price in cart in head */


// /** increase the total Price andd count in the right cart */
// var count_item_cart  =document.querySelector(".count_item_cart");
// var Price_cart_total=document.querySelector(".Price_cart_total");

// function getCartItems()
// {

//   let total_price = 0 ;/** increase price in cart */

//   let items_c= "";
//   for (let i = 0; i < product_cart.length; i++) {
//     items_c +=`
//     <div class="item_Card">
//                 <!--photo-->
//                 <img src="${product_cart[i].thumbnail}" alt="">
//                 <!--detail about product and hos price-->
//                 <div class="content">
//                     <h4>${product_cart[i].title}</h4>
//                     <p class="price_Card">${product_cart[i].price}</p>
//                 </div>
//                 <!--button to delete product-->
//                 <button onclick="remove_from_cart(${i})"  class="delete_item"><i class="fa-solid fa-trash"></i></button>
//             </div>
    
//     `

//     total_price +=product_cart[i].price ;/** increase price in cart */
//   }
//   items_in_cart.innerHTML=items_c ;
// /** increase the total Price andd count in header */
//   price_Card_Head.innerHTML="$"+ total_price ;/** increase price in cart */
//   count_item.innerHTML=product_cart.length;

//   /** increase the total Price andd count in the right cart */

//   count_item_cart.innerHTML= `(${product_cart.length}item in card)`;
//   Price_cart_total.innerHTML="$"+ total_price;
// }
// /************************************************************************************************* */
// /* remove the product from cart */
// /************************************************************************************************* */
// function remove_from_cart(index) {
//   product_cart.splice(index, 1);
  
//   getCartItems();

//   let addToCardButtons = document.querySelectorAll(".fa-cart-shopping");

//   for (let i = 0; i < addToCardButtons.length; i++) {
//     addToCardButtons[i].classList.remove("active");

//     product_cart.forEach(product => {
//       if (product.id === all_products_json.products[i].id) {
//         addToCardButtons[i].classList.add("active");
//       }
//     });
//   }
// }

//function to move from home page to product detail 
function moveToProductDetail(){
  // localStorage.setItem("selectedProductId", productId);
  //   window.location.href = "productDetail.html";
    window.open("productShow.HTML");
}

//************************************** */

window.onscroll = function () {
  const backToTopButton = document.getElementById('backToTop');
  if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
      backToTopButton.style.display = 'block'; 
  } else {
      backToTopButton.style.display = 'none'; 
  }
};

function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth' 
  });
}

