/*const goods = [
    { title: 'Mango  People  T-shirt', price: 52, img:'img/pi-1.png' },
    { title: 'Apple  People  T-shirt', price: 50, img:'img/pi-2.png' },
    { title: 'Banana  People  T-shirt', price: 64, img:'img/pi-3.png' },
    { title: 'Vine  People  T-shirt', price: 38, img:'img/pi-4.png'},
  ];

  const renderGoodsItem = (title, price, img = 'img/pi-5.png') => {
    return ` <div class="product__item">
    <a href="product-page.html"><img src="${img}" alt="" class="product__photo"></a>
    <a href="product-page.html" class="product__title">
    ${title}
    </a>
    <div class="product__price">
    $ ${price}
    </div>
    <a href="#" class="add-btn"><img src="img/cart-w.png" alt="cart-icon">Add to Cart</a>
  </div>`;
  };

  const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img));
    document.querySelector('.product__content').innerHTML = goodsList;
  }

  renderGoodsList(goods);*/

  class GoodsItem {
    constructor(title, price, img = 'img/pi-5.png') {
      this.title = title;
      this.price = price;
      this.img = img;
    }
    render() {
      return ` <div class="product__item">
        <a href="product-page.html"><img src="${this.img}" alt="product-img" class="product__photo"></a>
        <a href="product-page.html" class="product__title">
        ${this.title}
        </a>
        <div class="product__price">
        $ ${this.price}
        </div>
        <a href="#" class="add-btn"><img src="img/cart-w.png" alt="cart-icon">Add to Cart</a>
      </div>`;
    }
  }

  class GoodsList {
    constructor() {
      this.goods = [];
    }
    fetchGoods() {
      this.goods = [
        { title: 'Mango  People  T-shirt', price: 52, img:'img/pi-1.png' },
        { title: 'Apple  People  T-shirt', price: 50, img:'img/pi-2.png' },
        { title: 'Banana  People  T-shirt', price: 64, img:'img/pi-3.png' },
        { title: 'Vine  People  T-shirt', price: 38},
      ];
    }
    render() {
      let listHtml = '';
      this.goods.forEach(good => {
        const goodItem = new GoodsItem(good.title, good.price, good.img);
        listHtml += goodItem.render();
      });
      document.querySelector('.product__content').innerHTML = listHtml;
    }  
  }

  class Cart{

  }

  class CartItem{
    
  }

const list = new GoodsList();
list.fetchGoods();
list.render();

  
 
  
  
  
  