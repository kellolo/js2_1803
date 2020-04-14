class Cart {
    constructor(){
        //Инконка поверх корзины, отображающая количество продуктов в корзине
        this.count = document.querySelector('.cart__count');
        //Элемент корзины
        this.basket = document.querySelector('.drop');
        //Элемент, отображающий общую стоимость
        this.total = document.querySelector('.goods__total');
        //Иконка корзины
        this.iconCart = document.querySelector('.cart');
        //Иконка закрыть корзину
        this.iconClose = document.querySelector('.drop__close');
        //Общее количество товаров в корзине
        this.countProduct = 0;
        //массив, где хранятся элементы товаров в корзине
        this.productsArr = [];
    }

    /**
     *Добавляет ожидание события - открытие корзины
     */
    addEventOpenCart(){
        this.iconCart.addEventListener('click',() => this.basket.style.display = 'block');
    }

    /**
     *Добавляет ожидание события - закрытие корзины
     */
    addEventCloseCart(){
        this.iconClose.addEventListener('click',(evt) => {
            this.basket.style.display = 'none';
            evt.stopPropagation();
        });
    }

    /**
     *Функция добавления товара в корзину       
     *Проверяет есть ли такой товар уже в корзине           
     *Если есть - меняет количество конкретного товара, если нет - добавляет товар      
     * @param {HTMLDivElement} product  элемент, который добавляют в корзину     
     */
    addProductInBasket(product){   
        if(this.isProductInBacket(product.dataset.id)){
            this.addCountProduct(product.dataset.id);
        }
        else{
            this.addNewProduct(product);
        } 
        this.setCountProduct() ; 
        this.changeCountBadge();  
        this.setTotalSum();  
    }

    /**
     *Обработчик события - изменения количества товара 
     *
     * @param {Event} evt
     */
    handlerEventChangeCount(evt){
        this.getObjProductById(evt.currentTarget.parentNode.dataset.id).count = evt.currentTarget.value;
        this.setCountProduct();
        this.changeCountBadge();
        this.setTotalSum(); 
    }

    /**
     *Обработка события - нажатие на кнопку удалить продукт из корзины
     * @param {MouseEvent} evt
     */
    handlerEventDelete(evt){
        let product = evt.currentTarget.parentNode;
        this.deleteProduct(product.dataset.id);
        this.setCountProduct();
        product.remove();
        this.changeCountBadge();
        this.setTotalSum(); 
    }

    /**
     *Функция считаем сумму всех товаров в корзине      
     *Если корзина пуста - выводит пустое поле      
     *Если нет - умножает цену товара на его количество и суммирует всю стоимость
     */
    setTotalSum(){
        if(this.productsArr.length == 0){
            this.total.querySelector('.drop__total').innerText = "";
            return 
        }
        let sum = 0;
        this.productsArr.forEach(function(product){
            let price = parseInt(product.price.split(' ').join(''));
            let count = +product.count;
            sum += price * count;
        })
        this.total.querySelector('.drop__total').innerText =`${sum} ₽`;
    }


    /**
     *Функция проверяет есть ли уже такой продукт в корзине
     *
     * @param {String} id id добавляемого продукта
     * @returns Возвращает true если продукт уже есть, false - если нет
     */
    isProductInBacket(id){
        for (let i = 0; i < this.productsArr.length; i++) {
            if(this.productsArr[i].id == id){
                return true;
            }
        }
        return false;
    }

    /**
     *Функция увеличивающая количество конкретного товара на 1
     *
     * @param {String} id id продукта в корзине, у которого необходимо поменять количество
     */
    addCountProduct(id){
        let product = this.getProductById(id);
        product.querySelector('.goods__count').value ++;
        this.getObjProductById(id).count++;
    }

    /**
     *Возвращает новый объект продукта
     *
     * @param {HTMLDivElement} product
     * @returns {Object}
     */
    getNewObjProduct(product){
        return {
            id: product.dataset.id,
            name: product.querySelector('.product__name').innerText,
            src: product.querySelector('img').src,
            price: product.dataset.price,
            count: 1
        }
    }

    /**
     *Функция добавляет новый элемен товара в разметку и массив товаров.          
     *А так же добавляет ему обработчики событий    
     * @param {HTMLDivElement} product  продукт, который добавляют в корзину
     */
    addNewProduct(product){
        let objProduct = this.getNewObjProduct(product);
        this.total.insertAdjacentHTML('beforebegin', this.getProductHTML(objProduct));
        this.productsArr.push(objProduct);
        this.addEventsListener(objProduct.id);    
    }

    /**
     *Возвращает элемент продукта из корзины с указанным id
     *
     * @param {String} id - id продукта
     * @returns {HTMLDivElement} 
     */
    getProductById(id){
        return this.basket.querySelector(`.goods[data-id='${id}']`);
    }

    /**
     *Возвращает объект продукта с указанным id из массива продуктов 
     *
     * @param {String} id
     * @returns {Obgect}
     */
    getObjProductById(id){
        for (let i = 0; i < this.productsArr.length; i++) {
            if(this.productsArr[i].id == id){
                return this.productsArr[i];
            }   
        }
    }
    
    /**
     *Добавляем обработчики событий:    
     *Нажатие на кнопку Delete      
     *Изменение количества товара
     * @param {String} id - id товара, которому надо добавить обработчики
     */
    addEventsListener(id){
        let product = this.getProductById(id);
        let buttonDelete = product.querySelector('.goods__delete');
        let count = product.querySelector('.goods__count');
        buttonDelete.addEventListener('click', this.handlerEventDelete.bind(this));
        count.addEventListener('change', this.handlerEventChangeCount.bind(this));
        count.addEventListener('keydown', evt => evt.preventDefault());
    }

    /**
     *Изменяет общее количество товара в корзине
     */
    setCountProduct(){
        this.countProduct = this.productsArr.reduce((count, product) => count + +product.count, 0) 
    }

    /**
     *Функция удаляет продукт из массива с продуктами в корзине
     *
     * @param {String} id id продукта, который надо удалить
     */
    deleteProduct(id){
        let index = this.productsArr.indexOf(this.getObjProductById(id))
        this.productsArr.splice(index, 1);
    }

    /**
     *Функция изменяет маркер с количеством товаров на иконке корзины
     *Если товаров в корзине нет - маркер убирается и в корзину добавляется сообщение 'В корзине пусто'
     */
    changeCountBadge(){
        if(this.countProduct == 0){
            this.count.style.display = 'none';  
            this.total.querySelector('.drop__info').innerText = 'В корзине пусто' ;        
        }
        else{
            this.count.style.display = 'block';  
            this.count.innerHTML = this.countProduct;
            this.total.querySelector('.drop__info').innerText = 'Total:';
        }  
    }

   
    /**
     *Возвращает готовую разметку продукта в корзине
     *
     * @param {Object} objProduct
     * @returns {String}
     */
    getProductHTML(objProduct){
        return  `<div class="goods" data-id="${objProduct.id}" data-price="${objProduct.price}">
                    <img src="${objProduct.src}" alt="" class="goods__img">
                    <div class="goods__text">
                        <p class="goods__name">${objProduct.name}</p>
                        <p class="goods__price">${objProduct.price} &#8381;</p>
                    </div>
                    <input class="goods__count" type="number" min="1" value="${objProduct.count}">
                    <p class = "goods__number">&nbsp;шт</p>
                    <div class="goods__delete"><i class="far fa-trash-alt"></i></div>
                </div>`    
    }
}
