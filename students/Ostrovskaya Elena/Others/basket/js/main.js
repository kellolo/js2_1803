'use strict'

//ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА

let PRODUCTS_NAMES = ['Смартфон Nokia 7.2 Charcoa', 'Смартфон Samsung Galaxy S10+ 128Gb', 'Смартфон Apple iPhone 11 64GB Black', 'Смартфон Huawei P30 Pro Breathing Crystal', 'Смартфон Xiaomi Mi Note 10 128GB Midnight Black','Смартфон Honor 20 Pro 256Gb Phantom Blue']
let PRICES = [15990,54990, 59990, 44990, 29990, 26990]
let IDS = [1, 2, 3, 4, 5]
let IMGS = ['img/nokia.jpg', 
'img/samsung.jpg',
'img/apple.jpg',
'img/huawei.jpg',
'img/xiaomi.jpg',
'img/honor.jpg']


window.addEventListener('load', function () {
    
   const cart = new Cart();
   const catalog = new Catalog();

   catalog.init(cart);
   catalog.createProducts();

   cart.addEventOpenCart();
   cart.addEventCloseCart();
})














