'use strict';

class SubTotal {
    constructor() {
        return {
            calories: null,
            price: null,
        }
    }
}

class Burger {
    allInputs = document.querySelectorAll('input');
    totalPrice = null;
    totalCalories = null;
    subTotal1; subTotal2; subTotal3;
    totalDiv = document.querySelector('.total');
    getSize() {
        let burgerSize = document.querySelectorAll('input[name=burgerSize]');
        burger.subTotal1 = new SubTotal();
        burgerSize.forEach(function (element) {
            if (element.checked === true) {
                burger.subTotal1.calories = +element.dataset.calories;
                burger.subTotal1.price = +element.dataset.price;
            }
        });
        console.log(burger.subTotal1);

    }

    getContent() {
        let burgerContent = document.querySelectorAll('input[name=burgerStuffing]');
        burger.subTotal2 = new SubTotal();
        burgerContent.forEach(function (element) {
            if (element.checked === true) {
                burger.subTotal2.calories = +element.dataset.calories;
                burger.subTotal2.price = +element.dataset.price;
            }
        });
        console.log(burger.subTotal2);
    }

    getTopping() {
        let burgerContent = document.querySelectorAll('input[name=burgerTopping]');
        burger.subTotal3 = new SubTotal();
        burgerContent.forEach(function (element) {
            if (element.checked === true) {
                burger.subTotal3.calories = +element.dataset.calories;
                burger.subTotal3.price = +element.dataset.price;
            }
        });
        console.log(burger.subTotal3);
    }

    addListeners(object) {
        object.forEach(item => item.addEventListener('change', actionOnChange));
    }
    total() {
        burger.totalPrice = burger.subTotal1.price + burger.subTotal2.price + burger.subTotal3.price;
        burger.totalCalories = burger.subTotal1.calories + burger.subTotal2.calories + burger.subTotal3.calories;
        burger.totalDiv.innerHTML = `Total your Order - $${burger.totalPrice} (Calories - ${burger.totalCalories})`;
    }
}

let burger = new Burger();
burger.addListeners(burger.allInputs);


function actionOnChange(event) {
    if (event.target.name === 'burgerSize') {
        burger.getSize();
    }
    if (event.target.name === 'burgerStuffing') {
        burger.getContent();
    }
    if (event.target.name === 'burgerTopping') {
        burger.getTopping();
    }

    burger.total();
    console.log(burger.totalPrice);
    console.log(burger.totalCalories);
}

window.addEventListener('load', function () {
    burger.getSize();
    burger.getContent();
    burger.getTopping();
    burger.total();
});