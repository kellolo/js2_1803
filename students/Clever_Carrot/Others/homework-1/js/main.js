const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

products.forEach(function (product) {
    renderProduct(product.title, product.price)
});

function renderProduct(title = 'Empty name', price = 'Unknown price') {
    document.querySelector('.products').innerHTML += `<div class="product-item">
               <div class="product-item-image"></div>
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Add to cart</button>
            </div>`;
};