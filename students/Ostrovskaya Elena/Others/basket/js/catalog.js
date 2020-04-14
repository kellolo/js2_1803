class Catalog{
    constructor(cart){
        this.products = [];  
        this.catalog = document.querySelector('.catalog');
    }

    /**
     *Добавляем необходимые для работы объекты
     *
     * @param {Cart} cart
     */
    init(cart){
        this.cart = cart;
    }

    /**
     *Создаем продукты - отрисовываем разметку и назначаем обработчик событий
     *
     */
    createProducts(){
        for (let i = 0; i < IDS.length; i++) {
            this.renderProduct(this.getObjProduct(i));
        }
        this.addEventListeners();
    }

    /**
     *Метод возвращает объект продукта с id, именем, ценой и изображением
     *
     * @param {Number} index
     * @returns {Object}
     */
    getObjProduct(index){
        return {
            id: IDS[index],
            name: PRODUCTS_NAMES[index],
            price: PRICES[index],
            src: IMGS[index],
        }
    }

    /**
     *Добавляем новый продукт в HTML разметку
     *
     * @param {Object} product
     */
    renderProduct(product){
        let newProduct = `<div class="product"  data-id="${product.id}" data-price="${product.price}">
            <img src="${product.src}" alt="${product.name}" class="product__img">
            <p class="product__name">${product.name}</p>
            <p class="product__price">${product.price} &#8381;</p>
            <div class="product__button">Купить</div>
        </div>`
        this.catalog.insertAdjacentHTML('beforeend', newProduct);
    }

    /**
     *Добавляем обработчик событий  - нажатие на кнопку Купить
     */
    addEventListeners(){
        let productBtns = document.querySelectorAll('.product__button');  
        productBtns.forEach( product =>
            product.addEventListener('click', this.handlerEventClick.bind(this))
        );
    }

    /**
     *Обработчик события - нажатие на кнопку Купить
     *
     * @param {MouseEvent} evt
     */
    handlerEventClick(evt){
        let product = evt.target.parentNode;
        this.cart.addProductInBasket(product);
    }
}