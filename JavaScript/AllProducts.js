fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    //to get all products
   const products_show = document.getElementById("products_show");


    all_products_json = data;

    data.products.forEach((product) => {
      products_show.innerHTML += `
                        <div class="product">
                        <div class="icons">
                            <span> <i onclick="addToCard(${
                              product.id
                            },this)"  class="fa-solid fa-cart-shopping"></i></span>
                            <span> <i class="fa-solid fa-heart"></i></span>
                            <span> <i class="fa-solid fa-share"></i></span>
                        </div>

           
                        <div class="img_product">
                            <img src="${product.thumbnail}" alt="${
        product.title
      }">
                            <!-- <img class="img_hover" src="img/product/product-2.jpg" alt="">-->
                        </div>


                        <h3 class="name_product">
                            <a href="#">${product.title}</a>
                        </h3>

                        <div class="stars">
                            ${'<i class="fa-solid fa-star"></i>'.repeat(
                              product.rating || 5
                            )}
                        </div>

                        <div class="price">
                            <p><span>${product.price}</span></p>
                        </div>

                    </div>
  `;
    });

    // تحديث السلايدر بعد تحميل البيانات
    initializeSlider();
  })
  .catch((error) => console.error("Error fetching products:", error));
