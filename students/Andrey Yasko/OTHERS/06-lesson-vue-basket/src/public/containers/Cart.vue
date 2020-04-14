<template>
    <div class="cart-block" v-show="cart_show">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong> <div id="quantity">{{getTotal}}</div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product" :item="item" :type="'cart'" />
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong> <div id="price">{{getSum}}</div>
        </div>
    </div>
</template>

<script>
import item from '../components/Item.vue'
export default {
    components: { item },
    data() {
        return {
            cart_show: false,
            items: [],
            total: 0,
            sum: 0,
            url: 'https://raw.githubusercontent.com/andykey-krsk/online-store-api/master/responses/getBasket.json'
        }
    },
    // methods: {

    // },
    computed: {
        getTotal(){
           // return this.items.forEach(item => this.total += item.quantity)
            return this.items.reduce((total, item)=> total +=  +item.quantity, 0)
        },
        getSum(){
            return this.items.reduce((sum, item)=> sum += +item.price * +item.quantity, 0)
        }
    },
    mounted() {
        this.$parent.getData(this.url)
        .then(data => {
            this.items = data.contents
            //this.total = data.countGoods 
            //this.sum = data.amount
        })
        //console.log(this.$parent.getData(this.url))
    }
}
</script>
