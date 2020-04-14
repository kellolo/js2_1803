<template>
            <div class="cart">
            <form action="#" class="search-form">
                <input type="text" class="search-field">
                <button class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <button class="btn-cart">Cart</button>
            <div class="cart-block ">
                <div class="d-flex">
                    <strong class="d-block">Всего товаров</strong> <div id="quantity"></div>
                </div>
                <hr>
                <div class="cart-items">
                    
                </div>
                <hr>
                <div class="d-flex">
                    <strong class="d-block">Общая ст-ть:</strong> <div id="price"></div>
                </div>
            </div>
        </div>
</template>

<script>
import item from '../components/Item.vue'
export default {
    components: {item},

    data: {
        total: 0,
        summ: 0,
    },
       methods: {
           runMet() {
               console.log(this.items)
           },
    addProduct(item) {
        let id = item.dataset.id;
       let find = this.items.find (item => item.id_product === id);
         if (find) {
            find.quantity++;
        } else {
             let prod = this._createNewProduct(item);
            this.items.push (prod);
        }         
        this._checkTotalAndSum ();
        this.render ();
    },
    _createNewProduct (prod) {
                return {
                     product_name: prod.dataset['name'],
                     price: prod.dataset['price'],
                    id_product: prod.dataset['id'],
                    quantity: 1
                }
            },
            deleteProduct (product) {
                  let id = product.dataset['id'];
                   let find = this.items.find (product => product.id_product === id);
                    if (find.quantity > 1) {
                     find.quantity--;
                    } else {
                        this.items.splice (this.items.indexOf(find), 1);
                   }
                         
                    this._checkTotalAndSum ();
                  this.render ();
                },
                    
    _checkTotalAndSum () {
                    let qua = 0;
                    let pr = 0;
                    this.items.forEach (item => {
                                pr += item.price * item.quantity;
                            })
                            this.sum = pr;
                        }


    },

}
</script>
