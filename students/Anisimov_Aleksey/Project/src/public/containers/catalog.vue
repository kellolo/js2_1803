<template>
    <div class="product center">
        <item v-for="item of filteredItems" :key="item.id" :item='item' @add='addToCart' />
    </div>
</template>

<script>
//import item from '../components/item'
export default {
    components: {
        item: () => import('../components/item')
    },
    data() {
        return {
            items: [],
            searchStr: '',
            filteredItems: [],
            url: '/api/catalog'
            //url: 'https://static.trendco.space/js-adv/responses/goods.json'
        }
    },
    methods: {
        addToCart(data) {
            let tempCart = this.$parent.$refs.cartRef.items
            let currItem = tempCart.find(item => item.id === data.id)
            if (currItem === undefined) {
                tempCart.push({
                    id: data.id,
                    title: data.title,
                    quantity: 1,
                    price: data.price,
                    summ: data.price
                })
            } else {
                currItem.quantity++
                currItem.summ = currItem.quantity * currItem.price
            }
            this.$parent.sendData('/api/addtocart', tempCart)
                .then( res => {
                    if (res.result === 1) {
                        console.log('Success! File write!');
                    } else {
                        console.log('!!!Error read file!!!');
                        
                    }
            })

        },
        filterGoods(string) {
            let regexp = new RegExp(string, 'i') // создали регулярку
            this.filteredItems = this.items.filter(good => regexp.test(good.title)) // отфильтровали и записали, следом сразу рендер
        }
    },
    computed: {

    },
    mounted() {
        this.$parent.getData(this.url)
            .then(data => {this.items = data})
            .then(() => {this.filteredItems = this.items})
    }
}
</script>