'use strict';

let btn = document.querySelector('.btn');

const size = {
    big:{
        price:100,
        calories:40
    },
    small:{
        price:50,
        calories:20
    }
};

const stuffing = {
    cheese:{
        price:10,
        calories:20
    },
    salat:{
        price:20,
        calories:5
    },
    potato:{
        price:15,
        calories:10
    }
}

const topping = {
    prip:{
        price:15,
        calories:0
    },
    maz:{
        price:20,
        calories:5
    }
}

class Hamburger{
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
    }
    getSize(){
        return this.size;
    }
    getStuffing() {
        return this.stuffing;
    }
    addTopping(toppings) {
        this.toppings = toppings
    }
    getToppings(){
        return this.toppings
    }
    calculatePrice() {
        let toppings = this.getToppings();
        let sum = this.getSize().price + this.getStuffing().price;
        if(toppings.length == 0)
            return sum;
        toppings.forEach(function(topping){
            sum += topping.price;
        })
        return sum;
    }
    calculateCalories() {
        let toppings = this.getToppings();
        let sum = this.getSize().calories + this.getStuffing().calories;
        if(toppings.length == 0)
            return sum;
        toppings.forEach(function(topping){
            sum += topping.calories;
        })
        return sum;
    }
}

btn.addEventListener('click', function(){
    let sizeInput = document.querySelector('input[name="size"]:checked').dataset.size;
    let stuffingInput = document.querySelector('input[name="stuffing"]:checked').dataset.stuffing;
    let burger = new Hamburger(size[sizeInput], stuffing[stuffingInput]);
    let toppings = [];
    document.querySelectorAll('input[name="topping"]:checked').forEach(function(toppingInput){
        toppings.push(topping[toppingInput.dataset.topping]);
    });
    burger.addTopping(toppings);
    console.log(burger);
    console.log(burger.calculatePrice());
    console.log(burger.calculateCalories());
})
