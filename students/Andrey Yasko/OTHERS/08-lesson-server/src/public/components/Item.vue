<template>
<div :class="type.match(/catalog|temp/i) ? 'product-item' : 'cart-item'">
    <template v-if="type === 'catalog'">            
                    <img :src="imgCompute" :alt="item.product_name">
                    <div class="desc">
                        <h1>{{ item.product_name }}</h1>
                        <p>{{ item.price }}</p>
                        <button class="buy-btn" @click="$parent.addProduct(item)">Купить</button>
                    </div>
                


    </template>
    <template v-if="type === 'cart'">           
                    <img :src="imgCompute" alt="">
                    <div class="product-desc">
                        <p class="product-title">{{ item.product_name }}</p>
                        <p class="product-quantity">{{ item.quantity }}</p>
                        <p class="product-single-price">{{ item.price }}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" @click="$emit('remove', item)">&times;</button>
                    </div>

    </template>
    <template v-if="type === 'temp'">
            <img :src="'https://placehold.it/300x200'">
            <div class="desc">
                <label>
                    <input type="text" placeholder="Item name" v-model="newProduct.product_name" class="w-50">
                </label>
                <label>
                   <input type="number" placeholder="Item price" v-model="newProduct.price" class="w-50"> 
                </label>
                <button class="buy-btn" name="buy-btn" @click="createNew()">Добавить</button>
            </div>

    </template>

</div>

</template>

<script>
export default {
    data() {
        return {
            newProduct: {
                product_name: '',
                price: 0
            }
        }
    },
    props: {
        type:  {
            type: String,
            default: 'catalog'
            
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
        createNew() {
            this.$emit('create', this.newProduct);
            this.newProduct.product_name = '';
            this.newProduct.price = 0;
        }
        
    }
    
}
</script>