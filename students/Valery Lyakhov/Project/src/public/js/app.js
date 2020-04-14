class GoodsItem {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
                    <img class="goods-item_img" src="${this.img}"  alt="product">
                    <h3>${this.title}</h3>
                    <p class="textP">${this.price}</p>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, img: 'img/Product_1.png' },
            { title: 'Socks', price: 50, img: 'img/Product_2.png' },
            { title: 'Jacket', price: 350, img: 'img/Product_3.png' },
            { title: 'Shoes', price: 250, img: 'img/Product_4.png' },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

    const list = new GoodsList();
    list.fetchGoods();
    list.render();


    export default function app() {
        console.log('Jobs done!')
        const list = new GoodsList();
        list.fetchGoods();
        list.render();
     }