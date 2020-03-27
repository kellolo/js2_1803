class Basket{
    constructor(){
        this.items = new Array();
    }
    addGood(){
       
    }
    delGood(){

    }
    sumGoods(){

    }
}

class GoodItem{
    constructor(id, title, price, description='описание'){
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }
    render(){
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p><h5>${this.description}</h5></div>`;
    }
}

class GoodsList{
    constructor() {
        this.goods = [
            { id: 0, title: 'Shirt', price: 150, description: 'Рубашка' },
            { id: 1, title: 'Socks', price: 50, description: 'Носки' },
            { id: 2, title: 'Jacket', price: 350 },
            { id: 3, title: 'Shoes', price: 250, description: 'Обувь' },
            { id: 4, title: 'Jeans', price: 450, description: 'Джинсы' },
        ];
    }
    // fetchGoods(){
    //     this.goods = [
    //         { id: 0, title: 'Shirt', price: 150, description: 'Рубашка' },
    //         { id: 1, title: 'Socks', price: 50, description: 'Носки' },
    //         { id: 2, title: 'Jacket', price: 350 },
    //         { id: 3, title: 'Shoes', price: 250, description: 'Обувь' },
    //         { id: 4, title: 'Jeans', price: 450, description: 'Джинсы' },
    //     ];
    // }
    
    sumGoods(){
        let listHtml = '';
        let sumPrice = 0;
        this.goods.forEach(good => {sumPrice += good.price})
        listHtml = `Корзина: ${sumPrice}`; 
        document.querySelector('.cart-button').innerHTML = listHtml;
    }
    render(){
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodItem(good.id, good.title, good.price, good.description);
            listHtml += goodItem.render();
        });
    document.querySelector('.goods-list').innerHTML = listHtml;

    }
}

const list = new GoodsList();
list.render();

function sumGoods(){
    let list = new GoodsList();
    list.sumGoods();
}

let btn = document.querySelector("[type='button']");
btn.addEventListener('click', sumGoods);
