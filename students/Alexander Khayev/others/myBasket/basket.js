/***
 * Класс "корзина" для интернет-магазина. Содежит в себе только идентификаторы товаров и их количество
 */
class Basket {
  /**
   * @type { {int}: { count: {int} }}
   */
  idOfProducts = {};

  /**
   * Кладем карточку товара в корзину. В качестве параметра сам html объект карточки товара
   * @param {.product[data-id] }
   */
  push(product) {
    if (this.alreadyExist(product.dataset.id)) {
      ++this.idOfProducts[product.dataset.id].count;
    } else {
      this.idOfProducts[product.dataset.id] = {"count": 1};
    }
  }

  /**
   * Проверяем наличие данного товара в корзине
   * @param productId
   * @returns {boolean}
   */
  alreadyExist(productId) {
    return productId in this.idOfProducts;
  }

  /**
   * Обзая сумма корзины
   * @returns {number}
   */
  getTotalAmount() {
    let amount = 0;
    for (let key in this.idOfProducts) {
      amount += products[key].price * this.idOfProducts[key].count;
    }
    return amount;
  }

  /**
   * Общее количество позиций в корзине
   * @returns {number}
   */
  getTotal() {
    let total = 0;
    for (let key in this.idOfProducts) {
      total += this.idOfProducts[key].count;
    }
    return total;
  }
}
