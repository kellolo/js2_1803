<template>
    <div class="products">
        <item v-for="item of showItem" :key="item.id_product" :item="item" @add="addToCart"/>
    </div>
</template>

<script>
import item from '../components/Item.vue'
export default {
    components: { item },
    data() {
        return {
            items: [],
            url: '/api/catalog',
            //url: 'https://raw.githubusercontent.com/andykey-krsk/online-store-api/master/responses/catalogData.json',
            showItem: []
        }
    },
    methods: {
        addToCart(item){
            this.$parent.$refs.cartRef.addToCart(item)
        },
        setShowItems(search){
            this.showItem = this.items.filter(item => search == "" || item.product_name.toLowerCase().includes(search))
        }
    },
    // computed: {

    // },
    mounted() {
        this.$parent.getData(this.url)
        .then(data => {
            this.items = data
            this.showItem = data
        })
    }
}
</script>
