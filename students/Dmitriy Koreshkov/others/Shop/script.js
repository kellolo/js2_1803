"use strict";
/*
const goods = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 }
];

const renderGoodsItem = (title, price) => {
  return `<div class="goods-item"><h3 class="goods-title">​${title}​</h3><p class="goods-price">​${price}​</p></div>`;
};

const renderGoodsList = list => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  console.log(goodsList);
  document.querySelector(".goods-list").innerHTML = goodsList.join("");
};

renderGoodsList(goods);
*/

// класс товара
class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3 class="goods-title">​${this.title}​</h3><p class="goods-price">​${this.price}​</p></div>`;
  }
}

// класс список товара
class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150 },
      { title: "Socks", price: 50 },
      { title: "Jacket", price: 350 },
      { title: "Shoes", price: 250 }
    ];
  }
  render() {
    let listHtml = "";
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
      console.log(listHtml);
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
