<template>
    <div class="cart-block">
        <item :type="'cart'" v-for="item of items" :key="item.id_product" :item="item" @remove="removeFromCart"/>
    </div>
</template>

<script>
import item from '../components/Item.vue';
export default {
    data() {
        return {
            items: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'
        }
    },
    components: { item },
    mounted() {
        this.$parent.getData(this.url)
        .then(data => {
            this.items = data.contents
        })
    },
    methods: {
        addToCart(item) {
            let id = item.id_product
            let find = this.items.find (product => product.id_product === id)
            if (find) {
                find.quantity++
            } else {
                let newItem = Object.assign({}, item, {quantity: 1})
                this.items.push (newItem)
            }
        },
        removeFromCart(item) {
            let id = item.id_product
            let find = this.items.find (product => product.id_product === id)
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.items.splice (this.items.indexOf(find), 1)
            }
        }

    }
    
    
}
</script>

