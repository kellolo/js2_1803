<template>
    <div class="products">
        <item v-for = "item of items" :key="item.id_product" :type = "'catalog'" :item="item"/>
    </div>
</template>

<script>
import item from '../components/Item.vue'
export default {
    components: { item },
    data() {
        return {
            items: [],
            url: '/api/catalog'
            //url:'https://raw.githubusercontent.com/Dmitriy-Nikolenko/online-store-api/master/responses/catalogData.json',
        }
    },
    methods: {

    },
     
     computed: {

     },
     mounted() {
         this.$parent.getData(this.url)
         .then(data => {
             this.items = data
         })
         //console.log(this)
     },
     methods: {
         addProduct(item) {
             this.$parent.$refs.cartRef.addProduct(item)
         }
     }
    
}
</script>

