'use strict'
let PRODUCTS_NAMES = []
let PRICES = []
let IDS = []
let IMGS = []

let API_url = "https://raw.githubusercontent.com/Ostrovskaya/js2_1803/master/students/Ostrovskaya%20Elena/Others/basket/my_store.json"

function makeGetRequest (url){
   return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onreadystatechange = function(){
         if(xhr.readyState === 4){
            if(xhr.status == 404){
               reject(new Error("Страница не найдена"));
            }
            resolve(xhr.responseText);
         }
      }
   })
}

makeGetRequest(API_url)
   .then((data) => {
      data = JSON.parse(data);
      data.forEach(obj => {
         PRODUCTS_NAMES.push(obj.product_name);
         PRICES.push(obj.price);
         IDS.push(obj.id);
         IMGS.push(obj.img);
      });

      const cart = new Cart();
      const catalog = new Catalog();

      catalog.init(cart);
      catalog.createProducts();

      cart.addEventOpenCart();
      cart.addEventCloseCart();
   })
   .catch((error) => {
      console.error(error);
   })

   
/*let PRODUCTS_NAMES = ['Смартфон Nokia 7.2 Charcoa', 'Смартфон Samsung Galaxy S10+ 128Gb', 'Смартфон Apple iPhone 11 64GB Black', 'Смартфон Huawei P30 Pro Breathing Crystal', 'Смартфон Xiaomi Mi Note 10 128GB Midnight Black','Смартфон Honor 20 Pro 256Gb Phantom Blue']
let PRICES = [15990,54990, 59990, 44990, 29990, 26990]
let IDS = [1, 2, 3, 4, 5, 6]
let IMGS = ['img/nokia.jpg', 
'img/samsung.jpg',
'img/apple.jpg',
'img/huawei.jpg',
'img/xiaomi.jpg',
'img/honor.jpg']*/















