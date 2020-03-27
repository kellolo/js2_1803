'use strict'

let form = document.querySelector ('#burgerForm')
let btn = document.querySelector ('#okBtn')
let newBurger = {}

const price = [
    [100, 50],
    [10, 20, 15],
    [15, 20]
]

const calories = [
    [40, 20],
    [20, 5, 10],
    [0, 5]
]
     

btn.addEventListener ('click', addBurger)

function addBurger(){
    newBurger = new Burger ('Size','Filling','Option')
    newBurger.renderPrice()
    newBurger.renderCalories()
}

class Burger {
    constructor (size, filling, option){
        this.Size = this._check (size)
        this.Filling = this._check (filling)
        this.Option = this._getArray(option)
    }

    _check (attrName) {
        let obj = document.querySelector (`input[name=${attrName}]:checked`)
        return obj.value
    }

    _getArray (attrName) {
        let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)]
        let arr = []
        objArr.forEach (el => {
            arr.push (el.value)
        })
        return arr
    }

    calc (array){
        let result = 0
            if (this.Size == 'big'){
                result = array[0][0]
            }
            if (this.Size == 'small'){
                result = array[0][1]
            }
            if (this.Filling == 'chees'){
                result += array[1][0]
            }
            if (this.Filling == 'salad'){
                result += array[1][1]
            }
            if (this.Filling == 'potato'){
                result += array[1][2]
            }
            this.Option.forEach (el => {
                if (el == 'spice'){
                    result += array[2][0]
                }
                if (el == 'mayo') {
                    result += array[2][1]
                }
            })
        return result
    }

    renderPrice(){
        document.querySelector('.price').innerHTML = this.calc(price)
    }

    renderCalories(){
        document.querySelector('.calories').innerHTML = this.calc(calories)
    }
}