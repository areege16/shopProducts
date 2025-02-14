
// var arr = [
//     'https://dummyjson.com/products', 
//     'https://dummyjson.com/products/category/beauty',
//     'https://dummyjson.com/products/category/fragrances',
//     'https://dummyjson.com/products/category/groceries',
//     'https://dummyjson.com/products/category/furniture'
//   ];
  
//   var categoryItems = document.querySelectorAll(".header .links ul li");
  
//   categoryItems.forEach((item, index) => {
//     item.addEventListener("click", function() {
//       fetchData(arr[index], displayProducts);
//     });
//   });
  
//   function fetchData(url, callback) {
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => callback(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }
  
//   function displayProducts(data) {
//     const itemContainer = document.getElementById("item_sale");
//     itemContainer.innerHTML = ''; 
  
//     if (data && data.products) {
//       data.products.forEach((product) => {
//         if (product.discountPercentage) {
//           itemContainer.innerHTML += `
//             <div class="product">
//               <div class="icons">
//                 <span> <i onclick="addToCard(${product.id},this)" class="fa-solid fa-cart-shopping"></i></span>
//                 <span> <i class="fa-solid fa-heart"></i></span>
//                 <span> <i class="fa-solid fa-share"></i></span>
//               </div>
//               <span class="sale_perset">${product.discountPercentage}%</span>
//               <div class="img_product">
//                 <img src="${product.thumbnail}" alt="${product.title}">
//               </div>
//               <h3 class="name_product">
//                 <a href="#">${product.title}</a>
//               </h3>
//               <div class="stars">
//                 ${'<i class="fa-solid fa-star"></i>'.repeat(product.rating || 5)}
//               </div>
//               <div class="price">
//                 <p><span>${product.price}</span></p>
//                 <p class="old_price">$${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}</p>
//               </div>
//             </div>
//           `;
//         }
//       });
//     }
//   }
  
//   fetchData(arr[0], displayProducts);
  

