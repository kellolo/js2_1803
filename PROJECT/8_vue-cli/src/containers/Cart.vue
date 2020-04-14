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
            url: '/api/cart'
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
                this.$parent.putData(`/api/cart/${find.id_product}`, {delta: 1})
                .then(stat => {
                    if (stat.status) {
                        find.quantity++
                    }
                })
            } else {
                let newItem = Object.assign({}, item, {quantity: 1})
                this.$parent.postData(this.url, newItem).then(d => {
                    if (d.status) {
                        this.items.push (newItem)
                    }
                })
                
            }
        },
        removeFromCart(item) {
            let id = item.id_product
            let find = this.items.find (product => product.id_product === id)
            if (find.quantity > 1) {
                this.$parent.putData(`/api/cart/${find.id_product}`, {delta: -1})
                .then(stat => {
                    if (stat.status) {
                        find.quantity--
                    }
                })
            } else {
                this.$parent.deleteData(`/api/cart/${find.id_product}`)
                .then(stat => {
                    if (stat.status) {
                        this.items.splice (this.items.indexOf(find), 1)
                    }
                })
            }
        }
    }
    
}
</script>
