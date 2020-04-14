"use strict";

function makeGETRequest(url,callback){
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      callback(xhr.responseText); 
    }
  }
  xhr.open("GET", url, true);
  xhr.send();
}

const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

// класс товара
class GoodsItem {
  constructor(title, price) {
    this.product_name = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3 class="goods-title"></h3>${this.product_name}</h3><p class="goods-price">${this.price}</p></div>`;
  }
}
// класс список товара
class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods(cb) {
    makeGETRequest (`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })
  }
 
  render() {
    let listHtml = "";
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
      console.log(listHtml);
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

}

const list = new GoodsList();
list.fetchGoods(() => {list.render();
})
