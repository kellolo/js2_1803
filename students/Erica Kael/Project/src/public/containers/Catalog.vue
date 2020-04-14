<template>
    <div class="products">
        <item v-for="item of items" :key="item.id_product" :item="item" @add="addToCart"/>
    </div>
</template>

<script>
import item from '../components/Item.vue'
export default {
    components: { item },
    data(){
        return{
            items: [],
           // filteredGoods = [],
            url: '/api/catalog'
        }
    },
    methods: {
         addToCart(item) {
            this.$parent.$refs.cartRef.addToCart(item)
        },
         //filterGoods(value){
            //const regexp = new RegExp(value, 'i')
           // this.items = this.filteredGoods.filter(good => 
                //regexp.test(good.product_name))  
        //} 
    },
    // computed: {

    // },
    mounted(){
        this.$parent.getData(this.url)
        .then(d=>{
            this.items = d
        })
    }
}
</script>