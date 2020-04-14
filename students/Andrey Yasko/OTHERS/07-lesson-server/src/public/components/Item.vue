<template>
<div :class="type ==='catalog' ? 'product-item' : 'cart-item'">
    <template v-if ="type === 'catalog'">            
                    <img :src="imgCompute" :alt="item.product_name">
                    <div class="desc">
                        <h1>{{ item.product_name }}</h1>
                        <p>{{ item.price }}</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                


    </template>
    <template v-if = "type === 'cart'">           
                    <img :src="imgCompute" :alt="item.product_name">
                    <div class="product-desc">
                        <p class="product-title">{{ item.product_name }}</p>
                        <p class="product-quantity">{{ item.quantity }}</p>
                        <p class="product-single-price">{{ item.price }}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
                    </div>

    </template>

</div>

</template>

<script>
export default {
    props: ['type'],

    props: {
        type:  {
            type: String,
            default: 'catalog'
            //default: () => 'catalog'
        },
        item: {
            type: Object
        }
    },
    computed: {
        imgCompute() {
            return this.type === 'catalog' ? 'https://placehold.it/300x200' : 'https://placehold.it/100x80'
        }
    },
    methods: {
      addProduct(item) {
        let id = item.id_product;
       let find = this.items.find (item => item.id_product === id);
         if (find) {
            find.quantity++;
        } else {
             let prod = this._createNewProduct(item);
            this.items.push (prod);
        }         
    }
    },
    _createNewProduct (prod) {
                return {
                     product_name: prod.dataset['name'],
                     price: prod.dataset['price'],
                    id_product: prod.dataset['id'],
                    quantity: 1
                }
            }
    
}
</script>
