let app = new Vue({
    el: '#cart',
    data: {
        items: [],
        show: false
    },
    methods: {
    },
    computed: {
    },
})

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
        if (textOnButton === 'Details') {
            showMoreText(card);
        } else if (textOnButton === 'Cancel') {
            hideMoreText(card);
        }
        
            function showMoreText(card) {
                card.img.style.display = 'none';
                const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Tellus at urna condimentum mattis pellentesque id nibh. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Nisi quis eleifend quam adipiscing vitae proin sagittis. Magna etiam tempor orci eu. Turpis egestas sed tempus urna et pharetra pharetra massa massa. Diam ut venenatis tellus in metus vulputate eu. Tincidunt augue interdum velit euismod in pellentesque massa placerat duis. Ut consequat semper viverra nam libero justo laoreet sit amet. Amet luctus venenatis lectus magna fringilla urna.';
                card.productName.insertAdjacentHTML('afterend', `<div class="desc">${text}</div>`);
                card.button.innerText = 'Cancel';
            }

            function hideMoreText(card) {
                card.img.style.display = 'inline-block';
                card.wrap.querySelector('.desc').remove();
                card.button.innerText = 'Details'; 
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