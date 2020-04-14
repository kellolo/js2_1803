import {
    CART_BLOCK, CATALOG_BLOCK, IMG_PLACEHOLDER, API_URL,
    IMG_PLACEHOLDER_CART, URL_ADD_CART, URL_DEL_CART, URL_GET_CART, URL_GET_CATALOG
} from "./CONSTANTS";

class List {
    constructor(url, container) {
        this.url = url
        this.container = container
        this.items = []
        this._init()
    }

    _init() {
        return false
    }

    getData(url) {
        return fetch(API_URL + url).then( response => response.json() )
    }

    getContainer(){
        return document.querySelector(this.container)
    }

    render() {
        let html = ""
        this.items.forEach( item => {
            html += new lists[this.constructor.name](item).render()
        })
        this.getContainer().innerHTML = html
    }

}
class ListItem {

    constructor(item) {
        this.item = item
        this.img = IMG_PLACEHOLDER
    }

    render() {
        return `
            <div class="col-sm-4 col-lg-3 col-lg-2 mb-4">
                <div class="card">
                    <img class="card-img-top" src="${this.img}" alt="${this.item.product_name}">
                    <div class="card-body">
                        <h1 class="card-title">${this.item.product_name}</h1>
                        <p class="card-text">${this.item.price}</p>
                        <button 
                            class="btn btn-primary" 
                            name="btn-buy"
                            data-name="${this.item.product_name}"
                            data-price="${this.item.price}"
                            data-id="${this.item.id_product}"
                        >Купить</button>
                    </div>
                </div>
            </div>`;
    }

}

class Catalog extends List {

    constructor(url, container) {
        super(url = URL_GET_CATALOG, container = CATALOG_BLOCK)
        this.cart = null
    }

    _init() {
        this.getData(this.url)
            .then( catalog => this.items = catalog)
            .then( () => this.render() )
            .finally( () => this._handleEvents() )
    }

    _handleEvents () {
        this.getContainer().addEventListener ('click', (evt) => {
            if (evt.target.name === 'btn-buy') {
                this.cart.addProduct (evt.target)
            }
        })
    }

}

class Cart extends List {

    constructor(url, container) {
        super(url = URL_GET_CART, container = CART_BLOCK)
        this.total = 0
        this.quantity = 0
    }

    _init() {
        this.getData(this.url)
            .then( cart => this.items = cart.contents)
            .then( () => this.render() )
            .finally( () => this._handleEvents() )
    }

    _handleEvents () {
        this.getContainer().addEventListener ('click', (evt) => {
            if (evt.target.name === 'btn-del') {
                this.deleteProduct (evt.target)
            }
            if (evt.target.name === 'cart-cleaner') {
                this.clearProducts ()
            }
        })
    }

    _createNewProduct (prod) {
        return {
            id_product: +prod.dataset['id'],
            product_name: prod.dataset['name'],
            price: +prod.dataset['price'],
            quantity: 1
        }
    }

    _checkTotalAndSum () {
        let quantity = 0
        let total = 0

        this.items.forEach (item => {
            quantity += item.quantity
            total += item.price * item.quantity
        })

        this.quantity = quantity
        this.total = total
    }

    addProduct (product) {
        this.getData(URL_ADD_CART)
            .then( () => {
                product = this._createNewProduct (product)
                let find = this.items.find (item => item.id_product === product.id_product)
                if (find) {
                    find.quantity++
                } else {
                    this.items.push (product)
                }
            })
            .then( () => this.render() )
    }

    deleteProduct (product) {
        this.getData(URL_DEL_CART)
            .then( () => {
                product = this._createNewProduct (product)
                let find = this.items.find (item => item.id_product === product.id_product)
                if (find.quantity > 1) {
                    find.quantity--
                } else {
                    this.items.splice (this.items.indexOf(find), 1)
                }
            } )
            .then( () => this.render() )
    }

    clearProducts () {
        this.getData(URL_DEL_CART)
            .then( () => this.items = [] )
            .then( () => this.render() )
    }

    CartItems() {
        let html = ""
        this.items.forEach( item => {
            html += new lists[this.constructor.name](item).render()
        })
        return html
    }

    Cart() {
        return `
            <div class="d-flex justify-content-between">
                <strong class="d-block">Всего товаров:</strong>
                <div id="quantity">${this.quantity}</div>
            </div>
            <hr>
            <div id="cart-items">${this.CartItems()}</div>
            <hr>
            <div class="d-flex justify-content-between">
                <strong class="d-block">Общая ст-ть:</strong>
                <div id="price">${this.total} руб.</div>
            </div>
            <div class="d-flex justify-content-between">
                <button name="cart-cleaner" class="btn btn-danger mt-3">Очистить корзину</button>
            </div>`
    }

    render() {
        this._checkTotalAndSum ()
        this.getContainer().innerHTML = this.quantity ? this.Cart() : `Корзина пуста`
    }
}

class CatalogItem extends ListItem {}
class CartItem extends ListItem {

    constructor(item) {
        super(item)
        this.img = IMG_PLACEHOLDER_CART
    }

    render() {
        return `
            <div class="cart-item" data-id="${this.item.id_product}">
                <div class="cart-img">
                    <img src="${this.img}" alt="${this.item.product_name}">
                </div>
                <div class="product-desc">
                    <p class="product-title">${this.item.product_name}</p>
                    <p class="product-quantity">Количество: ${this.item.quantity}</p>
                    <p class="product-single-price">Цена: ${this.item.price}</p>
                </div>
                <div class="right-block">
                    <button name="btn-del" class="btn btn-danger" data-id="${this.item.id_product}">&times;</button>
                </div>
            </div>`
    }
}

let lists = {
    Catalog: CatalogItem,
    Cart: CartItem
}

export default function() {
    let catalog     = new Catalog()
    let cart        = new Cart()
    catalog.cart    = cart
}