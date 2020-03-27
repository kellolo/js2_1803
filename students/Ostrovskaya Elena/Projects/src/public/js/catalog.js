class Catalog{
    constructor(cart){
        this.items = [];
        this.container = document.querySelector ('.products');
        this.cart = cart;
    }

    /**
     *Создаем каталог
     *
     * @memberof Catalog
     */
    _init () {  
        this._handleData();
        this.render();
        this._handleEvents();
    }

     /**
     *Обработчик события - нажатия на кнопку Купить
     *
     */
    _handleEvents () {
        this.container.addEventListener ('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.cart.addProduct (evt.target)
            }
        })
    }

    /**
     *Метод создает новый объект - продукт
     *
     */
    _handleData () {
        for (let i = 0; i < IDS.length; i++) {
            this.items.push (this._createNewProduct (i))
        }
    }

    /**
     *Возвращает объект с данными о продукте
     *
     * @param {*} index
     * @returns
     */
    _createNewProduct (index) {
        return {
            product_name: PRODUCTS_NAMES [index],
            price: PRICES [index],
            id_product: IDS [index],
            img: IMGS [index]
        }
    }

    /**
     *Вставляет HTML- разметку товара каталога
     *
     */
    render () {
        let str = '';
        this.items.forEach (item => {
            str += `
                <div class="product-item">
                    <img src="https://placehold.it/300x200" alt="${item.product_name}">
                    <!--img src="${item.img}" width="300" height="200" alt="${item.product_name}"-->
                    <div class="desc">
                        <h1>${item.product_name}</h1>
                        <p>${item.price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${item.product_name}"
                        data-price="${item.price}"
                        data-id="${item.id_product}"
                        >Купить</button>
                    </div>
                </div>
            `
        })
        this.container.innerHTML = str;
    }
}