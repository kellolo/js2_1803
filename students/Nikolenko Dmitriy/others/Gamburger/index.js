let viewSmall = document.querySelector('.viewSmall');
let viewBig = document.querySelector('.viewBig');
let cost = document.querySelector('.cost');
let cal = document.querySelector('.cal');
let cheese = document.querySelector('.cheese');
let salad = document.querySelector('.salad');
let potatoes = document.querySelector('.potatoes');
let seasoning = document.querySelector('.seasoning');
let mayonnaise = document.querySelector('.mayonnaise');
let but = document.querySelector('.button');

class ViewGamburger {
    constructor() {
        this.priceBig = 100;
        this.priceSmall = 50;
        this.calBig = 40;
        this.calSmall = 20;
        }
        //Проверяем выбор пользователя и считаем стоимость и каллории
    countCostCalGamberger() {        
        if (viewSmall.checked) {
            cost.value = this.priceSmall;
            cal.value =  this.calSmall;      
               } else {
                cost.value = this.priceBig;            
                cal.value = this.calBig;         
                        }
    }
}
class ViewFilling {
    constructor() {
        this.priceCheese = 10;
        this.calCheese = 20;
        this.priceSalad = 20;
        this.calSalad = 5;
        this.pricePotatoes = 15;
        this.calPotatoes = 10;
    }
    //Проверяем выбор пользователя и считаем  стоимость и каллории
    countCostCalFilling() {
        if (cheese.checked) {
            cost.value = Number(cost.value) + this.priceCheese;
            cal.value = Number(cal.value) + this.calCheese;
        } else if (salad.checked) {
            cost.value = Number(cost.value) + this.priceSalad;
            cal.value = Number(cal.value) + this.calSalad;
        } else if (potatoes.checked) {
            cost.value = Number(cost.value) + this.pricePotatoes;
            cal.value = Number(cal.value) + this.calPotatoes;
        }
     }
}
class Topping {
    constructor() {
        this.priceSeasoning = 15;
        this.calSeasoning = 0;
        this.priceMayonnaise = 20;
        this.calMayonnaise = 5;
    }
    //Проверяем выбор пользователя и считаем  стоимость и каллории
    countCostCalTopping() {
        if (seasoning.checked) {
            cost.value = Number(cost.value) + this.priceSeasoning;
            cal.value = Number(cal.value) + this.calSeasoning;
        }
        if (mayonnaise.checked) {
            cost.value = Number(cost.value) + this.priceMayonnaise;
            cal.value = Number(cal.value) + this.calMayonnaise;
        }

    }
}

let gamburger = new ViewGamburger();
let filling = new ViewFilling();
let topping = new Topping();
but.addEventListener('click', function(){
gamburger.countCostCalGamberger();
filling.countCostCalFilling();
topping.countCostCalTopping();

})
