let API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor(url, container) {
        this.container = container;
        this.url = url;
        this.items = [];
        this._init();
    }

    _init() {
        return false;
    }

    getData(url) {
        return fetch(API + url).then(data => data.json())
    }

    render() {
        let block = document.querySelector(this.container);
        let str = '';
        this.items.forEach(item => {
            str += new lists[this.constructor.name](item).render();
        })
        block.innerHTML = str;
        this.quantityBlock.innerText = this.total
        this.priceBlock.innerText = this.sum
    }
}

class ListItem {
    constructor(item) {
        this.item = item;
        this.img = 'https://placehold.it/300x200';
    }
    render() {
        return `
                <div class="product-item">
                    <img src="${this.img}" alt="${this.item.product_name}">
                    <div class="desc">
                        <h1>${this.item.product_name}</h1>
                        <p>${this.item.price}</p>
                        <button 
                            class="buy-btn" 
                            name="buy-btn"
                            data-name="${this.item.product_name}"
                            data-price="${this.item.price}"
                            data-id="${this.item.id_product}"
                        >Купить</button>
                    </div>
                </div>
            `
    }

}

class Catalog extends List {
    constructor(url, container) {
        super(url = '/catalogData.json', container = '.products')
        this.cart = null
        this.filteredGoods = []

    }
    _init() {
        this.getData(this.url)
            .then(data => {
                this.items = data
                this.filteredGoods = data
            })
            .then(() => this.render())
            .finally(() => this._handleEvents())
    }


    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (e) => {
            if (e.target.name === 'buy-btn') {
                this.cart.addProduct(e.target)
            }
        })
        document.querySelector('.btn-search').addEventListener('click', (e) => {
            const value = document.querySelector('.search-field').value
            this.filterGoods(value)
        })
    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i')
        this.items = this.filteredGoods.filter(good =>
            regexp.test(good.product_name))
        this.render()
    }
}

class Cart extends List {
    constructor(url, container) {
        super(url = '/getBasket.json', container = '.cart-items')
        this.total = 0
        this.sum = 0
        this.quantityBlock = document.querySelector('#quantity')
        this.priceBlock = document.querySelector('#price')
    }
    _init() {
        this.getData(this.url)
            .then(data => {
                data.contents.forEach(el => this.items.push(el))
            })
            .then(() => this.render())
            .finally(() => this._handleEvents())
    }
    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (e) => {
            if (e.target.name === 'del-btn') {
                this.deleteProduct(e.target)
            }
        })
    }
    addProduct(item) {
        let id = item.dataset['id'];
        let find = this.items.find(product => product.id_product === id);
        if (find) {
            find.quantity++;
        } else {
            let prod = this._createNewProduct(item);
            this.items.push(prod);
        }
        this._checkTotalAndSum()
        this.render()
    }
    deleteProduct(item) {
        let id = item.dataset['id']
        let find = this.items.find(product => product.id_product === id)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice(this.items.indexOf(find), 1)
        }
        this._checkTotalAndSum()
        this.render()
    }
    _createNewProduct(prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    }
    _checkTotalAndSum() {
        let qua = 0
        let pr = 0
        this.items.forEach(el => {
            qua += el.quantity
            pr += el.price * el.quantity
        })
        this.total = qua
        this.sum = pr
    }
}

class CatalogItem extends ListItem {
    constructor(item) {
        super(item);
    }
}

class CartItem extends ListItem {
    constructor(item, img) {
        super(item);
        this.img = 'https://placehold.it/100x80';
    }

    render() {
        return `<div class="cart-item" data-id="${this.item.id_product}">
                    <img src="${this.img}" alt="">
                    <div class="product-desc">
                        <p class="product-title">${this.item.product_name}</p>
                        <p class="product-quantity">${this.item.quantity}</p>
                        <p class="product-single-price">${this.item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
                    </div>
                </div>`
    }
}

let lists = {
    Catalog: CatalogItem,
    Cart: CartItem
}

export default function app() {
    let catalog = new Catalog();
    let cart = new Cart()

    catalog.cart = cart
}