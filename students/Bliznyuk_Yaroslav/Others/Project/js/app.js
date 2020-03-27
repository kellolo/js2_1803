
var goodsController = (function() {
    class GoodsItem {
        constructor(id, title, price) {
            this.id = id;
            this.title = title;
            this.price = price;
        }
        render() {
            return `
            <div class="card mr-2 mb-4 col-md-3 p-0 shadow rounded border border-info" style="width: 12rem;">
              <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#868e96" />
                <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
              </svg>
              <!-- <img src="img/300x200.png" class="card-img-top" alt="..."> -->
              <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.price}</p>
                <button type="button" class="btn btn-info btn_card_bay" id=${this.id}>Bay</a>
              </div>
            </div>`;
        }
    }

    class GoodsList {
        constructor() {
            this.goods = [];
        }
        fetchGoods() {
            this.goods = [
                {id: 1, title: 'Product-1', price: 100},
                {id: 2, title: 'Product-2', price: 150},
                {id: 3, title: 'Product-3', price: 200},
                {id: 4, title: 'Product-4', price: 500},
            ]
        }
        render() {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new GoodsItem(good.id, good.title, good.price);
                listHtml += goodItem.render();
            });
            document.querySelector('#catalog').insertAdjacentHTML('beforeend', listHtml);
        }
        getGoodById(id) {
            for (let i=0; i < this.goods.length; i++) {
                if (this.goods[i].id == id) {
                    return this.goods[i];
                }
            }
            return false;
        }
    }
    var goodsList = new GoodsList();
    goodsList.fetchGoods();

    return {
        getGoodsList: function() {
            return goodsList;
        }
    };
})();

var cartController = (function() {
    class CartItem {
        constructor(product_id, product_name, price, quantity) {
            this.product_id = product_id;
            this.product_name = product_name;
            this.price = price;
            this.quantity = quantity;
        }
        
        render(row_num) {
            return `
                  <tr>
                    <th scope="row">${row_num}</th>
                    <td class="">${this.product_name}</td>
                    <td class="d-flex">
                      <input type="number" class="form-control col-5" 
                            data-target="${this.product_id}" value="${this.quantity}">
                      <button type="button" class="btn btn-outline-dark ml-2 btn-cart-item-del" 
                            data-target="${this.product_id}">Delete</button>
                    </td>
                    <td>${this.price}</td>
                  </tr>
            `;
        }
    }
    class Cart {
        constructor() {
            this.items = [];
        }
        getCartItems() {
            return this.items; 
        }
        getIndexOfItemId(id) {
            for (let i=0; i < this.items.length; i++) {
                if (this.items[i].product_id == id) {
                    return i;
                }
            }
            return false;
        }
        addItemById(id) {
            var indexOfItemId = this.getIndexOfItemId(id);
            if (indexOfItemId !== false) {
                this.items[indexOfItemId].quantity += 1;
            } else {
                let item = goodsController.getGoodsList().getGoodById(id);
                this.items.push({
                    product_id: item.id,
                    product_name: item.title,
                    price: item.price,
                    quantity: 1
                });
            }
        }
        deleteItemById(id) {
            var indexOfItemId = this.getIndexOfItemId(id);
            this.items.splice(indexOfItemId, 1);
        }
        getCartTotal() {
            var total = 0;
            for (let i = 0; i < this.items.length; i++) {
                total += this.items[i].quantity;
            }
            return total;
        }
        getCartCost() {
            var totalCost = 0;
            for (let i = 0; i < this.items.length; i++) {
                totalCost += this.items[i].quantity * this.items[i].price;
            }
            return totalCost;
        }
        render() {
            var $cart_info = document.getElementById("cart-info");
            if (this.items.length > 0) {
                var $cartTable = document.getElementById("cartTableTemplate").childNodes[1].cloneNode(true);
                var $tbody = $cartTable.childNodes[3];
                for (let i = 0; i < this.items.length; i++) {
                    const cartItem = new CartItem(
                        this.items[i].product_id, 
                        this.items[i].product_name, 
                        this.items[i].price,
                        this.items[i].quantity,
                    );
                    $tbody.insertAdjacentHTML('beforeend', cartItem.render(i + 1));
                }
                var $cartTableDiv = document.getElementById("cartTable");
                $cartTableDiv.innerHTML = "";
                $cartTableDiv.appendChild($cartTable);
                // initCartRowsElements();
                $cart_info.textContent = `${this.getCartTotal()} items in the cart in the amount of ${this.getCartCost()}`;
            } else {
                $cart_info.textContent = "Cart is empty";
                var $cartTableDiv = document.getElementById("cartTable");
                $cartTableDiv.innerHTML = "";
            }
        }
    }
    var cart = new Cart();   

    return {
        getCart: function() {
            return cart;
        }
    };

})();

// APP MAIN CONTROLLER
var controller = (function(goodsCtrl, cartCtrl) {
    var setupEventListeners = function() {
        // Bay button:
        document.querySelector('#catalog').addEventListener('click', ctrlAddItemToCart);
    };

    var ctrlAddItemToCart = function(event) {
        if (event.target.classList.contains('btn_card_bay')) {
            cart = cartCtrl.getCart();
            cart.addItemById(parseInt(event.target.id));
            cart.render();
            setupCartRowsEventListeners();
            console.log(cart.items);

        }
    };

    var setupCartRowsEventListeners = function() {
        var $deleteCartRowButtons = document.querySelectorAll("#cartTable .btn-cart-item-del");
        //console.log($deleteCartRowButtons);
        for (var i = 0; i < $deleteCartRowButtons.length; i++) {
            $deleteCartRowButtons[i].addEventListener('click', handleDeleteCartRowButtonClick);
        }
        var $inputCartQuantityFields = document.querySelectorAll("#cartTable input");
        for (var i = 0; i < $inputCartQuantityFields.length; i++) {
            $inputCartQuantityFields[i].addEventListener('change', handleInputCartQuantityFieldChange);
        }
    };

    var handleDeleteCartRowButtonClick = function(event) {
        var product_id = parseInt(event.target.dataset.target);
        var cart = cartCtrl.getCart();
        cart.deleteItemById(product_id);
        cart.render();
        setupCartRowsEventListeners();
    }

    function handleInputCartQuantityFieldChange(event) {
        //console.log(event.target.dataset.target);
        //console.log(event.target.value);
        var product_id = parseInt(event.target.dataset.target);
        var productCartNewQuantity = parseInt(event.target.value);
        var cart = cartCtrl.getCart();
        var productCartIndex = cart.getIndexOfItemId(product_id);
        cart.items[productCartIndex].quantity = productCartNewQuantity;
        cart.render();
        setupCartRowsEventListeners();
    }

    return {
        init: function() {
            goodsCtrl.getGoodsList().render();
            setupEventListeners();
        }
    }
})(goodsController, cartController);

// Start app
controller.init();
