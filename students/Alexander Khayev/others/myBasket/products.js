/**
 * Перечень товарных карточек
 */
const products = {
  "1": {name: "product1", id: 1, price: 100},
  "2": {name: "product2", id: 2, price: 200},
  "3": {name: "product3", id: 3, price: 300},
  "4": {name: "product4", id: 4, price: 400},
  "5": {name: "product5", id: 5, price: 123},
};

/**
 * Создает карточку товара, привязывает к ней события (привязывает ко всем продуктам сразу)
 */
function createProducts(){
  for (let prodId in products) {
    const template = `
      <div class="product" data-info="lorem10" data-id="${products[prodId].id}" data-price="${products[prodId].price}">
        <div class="product__name">${products[prodId].name}</div>
        <p class="price">Цена: ${products[prodId].price} руб.</p>
        <img class="product__img" src="img/item.webp" alt="">
        <button role="also"></button>
      </div>
    `;
    let owner = document.querySelector(".body");
    owner.insertAdjacentHTML("afterbegin", template);

    let prod = document.querySelectorAll(".product [role='also']");
    prod.forEach((item) => {
      item.removeEventListener("click", addProductInfo);
      item.addEventListener("click", addProductInfo);
    });
  }
  return true;
}

/**
 * Кладет товар в корзину и обновляет информацию в ней
 * @param event
 */
function addProductInfo(event){
  let prod = event.target.closest(".product");
  basket.push(prod);

  prod.classList.add("show-info");
  event.stopPropagation();

  updateBasketView();
}

/**
 * Обновляет информацию на basket view
 */
function updateBasketView(){
  const basketTotal = document.querySelector(".basket .total");
  const basketAmount = document.querySelector(".basket .amount");
  basketTotal.innerHTML = basket.getTotal() + " шт.";
  basketAmount.innerHTML = basket.getTotalAmount() + "руб.";
}
