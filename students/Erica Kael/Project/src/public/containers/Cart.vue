<template>
      <div class="cart-block ">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong> <div id="quantity">{{this.total}}</div>
        </div>
        <hr>
        <item v-for="item of items" :key="item.id_product" :type="'cart'" :item="item" @remove="removeFromCart"/>  
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong> <div id="price">{{this.sum}}</div>
        </div>
    </div>
</template>
<script>
import item from '../components/Item.vue'
export default {
    components: { item },
      data(){
        return{
            items: [],
            url: '/api/cart',
            sum: 0,
            total: 0
        }
    },
    methods:{
        addToCart(item){
            let id = item.id_product
            let find = this.items.find(item => item.id_product === id)
            if(find){
                find.quantity++
            }else {
                 let newItem = Object.assign({}, item, {quantity: 1})
                this.items.push (newItem)
            }
            this.checkTotalAndSum ()
        },
        removeFromCart(item){
            let id = item.id_product
            let find = this.items.find (item => item.id_product === id)
            if (find.quantity > 1){
                find.quantity--
            }else{
                this.items.splice (this.items.indexOf(find), 1)
            }
            this.checkTotalAndSum ()
        },
        checkTotalAndSum () {
            let qua = 0
            let pr = 0
            this.items.forEach (item => {
                qua += item.quantity
                pr += item.price * item.quantity
                })
            this.total = qua
            this.sum = pr
        }
    },
    mounted(){
        this.$parent.getData(this.url)
        .then(d=>{
            this.items = d.contents
            this.checkTotalAndSum ()
        })
    }
}
</script>