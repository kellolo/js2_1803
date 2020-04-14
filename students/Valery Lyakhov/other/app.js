
 //Предназначена для обработки кликов по "подробнее" в карточке товара, чтобы открывать дополнительную информацию о товаре.

const buttons = document.querySelectorAll('.info');
buttons.forEach(function (button){
    button.addEventListener('click', function (event){
        handleClick(event);
    })
});

function handleClick(clickedButtonEvent) {
    const cardNode = clickedButtonEvent.target.parentNode;

    const card = {
        wrap: cardNode,
        img: cardNode.querySelector('img'),
        productName: cardNode.querySelector('.productName'),
        button: cardNode.querySelector('.info'),
    };

    const textOnButton = card.button.innerText;
        if (textOnButton === 'Подробнее') {
            showMoreText(card);
        } else if (textOnButton === 'Отмена') {
            hideMoreText(card);
        }

            function showMoreText(card) {
                card.img.style.display = 'none';
                const text = 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.';
                card.productName.insertAdjacentHTML('afterend', `<div class="desc">${text}</div>`);
                card.button.innerText = 'Отмена';
            }

            function hideMoreText(card) {
                card.img.style.display = 'inline-block';
                card.wrap.querySelector('.desc').remove();
                card.button.innerText = 'Подробнее'; 
            }

}

let basketBtns = document.querySelectorAll('.toBasketBtn');
basketBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let id = event.srcElement.dataset.id;
        let price = event.srcElement.dataset.price;
        let name = event.srcElement.dataset.name;
        basket.addProduct({ id: id, price: price, name: name })
    })
});

let basket = {
    products: {},

    addProduct(product) {
        this.addProductToObject(product);
        this.renderProductInBasket(product);
        this.renderTotalSum();
        this.addRemoveBtnsListeners();
    },

    removeProductListener(event) {
        basket.removeProduct(event);
        basket.renderTotalSum();
    },

    addRemoveBtnsListeners() {
        let btns = document.querySelectorAll('.productRemoveBtn');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', this.removeProductListener);
        }
    },

    renderTotalSum() {
        document.querySelector('.total').textContent = this.getTotalSum();
    },

    addProductToObject(product) {
        if (this.products[product.id] == undefined) {
            this.products[product.id] = {
                price: product.price,
                name: product.name,
                count: 1
            }
        } else {
            this.products[product.id].count++;
        }
    },

    renderProductInBasket(product) {
        let productExist = document.querySelector(`.productCount[data-id="${product.id}"]`);
        if (productExist) {
            productExist.textContent++;
            return;
        }
        let productRow = `
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td class="productCount" data-id="${product.id}">1</td>
                <td><i class="fas fa-trash-alt productRemoveBtn" data-id="${product.id}"></i></td>
            </tr>
        `;
        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentHTML("beforeend", productRow);
    },

    getTotalSum() {
        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },

    removeProduct(event) {
        let id = event.srcElement.dataset.id;
        this.removeProductFromObject(id);
        this.removeProductFromBasket(id);
    },

    removeProductFromBasket(id) {
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        if (countTd.textContent == 1) {
            countTd.parentNode.remove();
        } else {
            countTd.textContent--;
        }
    },

    removeProductFromObject(id) {
        if (this.products[id].count == 1) {
            delete this.products[id];
        } else {
            this.products[id].count--;
        }
    }
}

const modal = document.querySelector('.wrap');
const showBtn = document.querySelector('.open');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', function () {   
    modal.classList.remove('openAnim');
    modal.classList.add('closeAnim');
    setTimeout(function() {
        modal.classList.add('displyNone');
    }, 800);
});

showBtn.addEventListener('click', function() {
    modal.classList.remove('closeAnim', 'displyNone');
    modal.classList.add('openAnim');
});