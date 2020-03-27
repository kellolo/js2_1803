"use strict";
class Hamburger {
  constructor() {
    this.totalCalories = 0, // значение цены гамбургера
    this.totalPrice = 0, // значение калорий гамбургера
    // свойство стандартный гамбургер
    this.standart = {
      price: 50,
      cal: 100
    };
    // свойство двойной гамбургер
    this.double = {
      price: 100,
      cal: 200
    };
    // свойства начинки
    this.tomato = {
      price: 12,
      cal: 12
    };
    this.cheese = {
      price: 20,
      cal: 20
    };
    this.bacon = {
      price: 30,
      cal: 30
    };
    this.salad = {
      price: 10,
      cal: 5
    };
    this.mayonnaise = {
      price: 15,
      cal: 25
    };
    this.spice = {
      price: 5,
      cal: 3
    };
  }
  /**
   * метод проверяет какой выбран гамбургер (стандартный или двойной) 
   * и взависимости от выбора увеличивает стоимость и калорийность
   */
  getSize() {
    let inputsSize = document.getElementsByName("size"); // получаем input radio
    if (inputsSize[0].checked) {
      this.totalPrice += this.standart.price;
      this.totalCalories += this.standart.cal;
      console.log(this.totalPrice, this.totalCalories);
    } else {
      this.totalPrice += this.double.price;
      this.totalCalories += this.double.cal;
      console.log(this.totalPrice, this.totalCalories);
    }
  }
  /**
   * Метод получает выбранную начинку и увеличивает стоимость и калорийность
   */
  getStuffing() {
    let stuffing = document.querySelectorAll("input[name=stuffing]:checked"); //получаем коллекцию с узлами (выбранные checkbox)  
    console.log(stuffing);
    for (let i = 0; i < stuffing.length; i++) {
      let nodeId = stuffing[i].id; // id выбранного чекбокса совпадает с названием свойства объекта (Hamburger)
      this.totalPrice += ham[nodeId].price; // получилось взять свойство только уже у созданого объекта
      this.totalCalories += ham[nodeId].cal;
    }
  }
  /**
   * Метод выводит на страницу цену и калории гамбургера
   */
  pushInfo() {
    document.getElementById("infoPrice").innerText = `Цена гамбургера: ${this.totalPrice} руб.`;
    document.getElementById("infoCalories").innerText = `Калорий в вашем гамбургера: ${this.totalCalories} кКал`;
  }
  /**
   * Метод обнуляет начальную стоимость и калории  
   */
  resetTotal() {
    this.totalPrice = 0;
    this.totalCalories = 0;
  }
  /**
   * по нажатию кнопки запускает основные методы
   */
  start() {
    let btn = document.getElementById("btn");

    function startMethods() {
      this.test();
      this.getSize();
      this.getStuffing();
      this.pushInfo();
      this.resetTotal();
      console.log(this.totalCalories, this.totalPrice);
    }
    let start = startMethods.bind(ham); //назначаем this новый объект
    btn.addEventListener("click", start);
  }
  
  test() {
    console.log(this.totalCalories, this.totalPrice);
  }
}

let ham = new Hamburger(); // создаем новый объект
ham.start();
