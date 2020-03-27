'use strict';
function getRandomNumber(min = 100, max = 5000) {
    return Math.floor(Math.random() * (max - min) + min);
}

let mainContainer = document.querySelector('.product');
let basketTable = document.querySelector('.basket__table');
let basketEmpty = document.querySelector('.basket__empty');
let basketImg = document.querySelector('.basket__img');
let counter = document.querySelector('.item__counter');

class DemoDB {
    constructor(quantity) {
        let array = [];
        for (let i=1; i <= quantity; i++) {
            let newItem = {
                id: i,
                title: "Product&nbsp;" + i,
                price: getRandomNumber()
            }
            array.push(newItem);
        }
        return array;
    }
}

const goods = new DemoDB(9);

class Item {
    buyBttnCl = '.addToCart';
    itemCont = '.product__item';
    delButtons() {
        return document.querySelectorAll('.basket__delete');
    }

    render(item) {
        return `\t\t<div class="product__item" data-id="${item.id}">
\t\t\t<img class="product__img" src="img/no_foto.jpg" alt="${item.title}">
\t\t\t<div class="product__desc">
\t\t\t\t<p class="product__h2">${item.title}</p>
\t\t\t\t<p class="product__price" data-price="${item.price}">$ ${item.price}</p>
\t\t\t</div>
\t\t\t<button class="addToCart" data-id="${item.id}">Купить</button>
\t\t</div>`
    }
    renderList(arr) {
        let str = '';
        arr.forEach(item => {
            str += this.render(item);
        });
        return str
    }


    addListener(el, func, evnt = 'click') {
        if (typeof el.length == 'undefined') {
            el.addEventListener(evnt, func);
        } else if (el.length > 0 ) {
            el.forEach(item => item.addEventListener(evnt, func));
        }
    }

    init() {
        mainContainer.innerHTML = this.renderList(goods);
        let goodsBtn = document.querySelectorAll(this.buyBttnCl);
        this.addListener(goodsBtn, cart.actionOnBuyBtn);
        this.addListener(basketImg, cart.emptyCart, 'mouseover');
        this.addListener(basketImg, cart.emptyCart, 'mouseout');
    }
}

class Cart {
    current = [];
    addItem() {
        let currentCart = cart.current; // текущая корзина
        let currItemId = +event.target.dataset.id; // получили id товара по которому кликнули
        let currItemCartIndx = currentCart.findIndex(item => item.id === currItemId); //нашли (или нет -1) товар в корзине
        let good = goods.find( el => el.id === currItemId); // нашли товар в БД по id
        if (currItemCartIndx === (-1)) { // если товара не было в корзине делаем след.
            currentCart.push({id: currItemId, qtt: 1, summ: good.price}); // добавим в корзину id товара, 1шт кол-во и цену из БД
            let lastEl = currentCart[currentCart.length -1];
            this.render(lastEl, good); // отрисуем строку с товаром в корзине
        } else {
            currentCart[currItemCartIndx].qtt++;
            currentCart[currItemCartIndx].summ = good.price * currentCart[currItemCartIndx].qtt;
            this.render(currentCart[currItemCartIndx], good);
        }
        setTimeout(product.addListener(product.delButtons(), cart.delItem), 100);
        //console.log(cart.current.length);
    }

    delItem() {
        let itemToDelId = +event.target.parentNode.parentNode.dataset.id;
        let itemToDelIdIndex = cart.current.findIndex( el => el.id === itemToDelId);
        cart.current.splice(itemToDelIdIndex, 1);
        event.target.parentNode.parentNode.remove();
        if (document.querySelectorAll('.basket__table_tr').length === 1) {
            cart.hideCart();
        }
        cart.counter();
        //console.log(cart.current.length);
    }

    actionOnBuyBtn() {
        cart.addItem();
        cart.showCart();
        cart.counter();
    }
    render(object, curEl) {
        let div = document.querySelector(`.basket__table_tr[data-id="${object.id}"]`); //поищем блок с таким товаром
        if (div === null) { // если нет, то добавим
            div = document.createElement('div');
            div.classList.add('basket__table_tr');
            div.setAttribute('data-id', object.id);
            let cartStr = `<div class="basket__table_td"><img class="product__img" src="img/no_foto.jpg" alt="${curEl.title}"></div>
                        <div class="basket__table_td">${curEl.title}</div>
                        <div class="basket__table_td">${object.qtt}</div>
                        <div class="basket__table_td">$&nbsp;${curEl.price}</div>
                        <div class="basket__table_td">$&nbsp;${object.summ}</div>
                        <div class="basket__table_td"><img src="img/trash-alt-solid.svg" alt="Delete Item" class="basket__delete"></div>`;
            div.innerHTML = cartStr;
            basketTable.append(div);
        } else { // если есть
            div.children[2].innerText = object.qtt; //то прибавим количество
            div.children[4].innerText = "$ " + object.summ; // и сумму
        }

    }

    counter() {
        if (cart.current.length > 0) {
            counter.innerText = cart.current.length;
            counter.classList.remove('hidden');
        } else {
            counter.classList.add('hidden');
        }

    }

    showCart() {
        if (basketTable.classList.contains('hidden')) {
            basketTable.classList.remove('hidden');
        }
    }
    hideCart() {
        basketTable.classList.add('hidden');
    }

    emptyCart() {
        if (cart.current.length === 0 && event.type === 'mouseover') {
            basketEmpty.classList.remove('hidden');
        //} else if (cart.current.length > 0 && event.type === 'mouseover') {
        //    cart.showCart();
        }
        else{
            basketEmpty.classList.add('hidden');
            //cart.hideCart();
        }
    }



}

let product = new Item();
let cart = new Cart();
product.init();
//console.log(cart.current);