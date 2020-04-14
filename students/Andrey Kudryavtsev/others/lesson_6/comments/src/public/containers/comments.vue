<template>
    <div class="container">
        <item class="post" v-for="item of items" :key="item.id" :item="item" />
    </div>
</template>

<script>
import item from '../components/Item.vue'
export default {
    components: { item },
    data() {
        return {
            url: 'https://jsonplaceholder.typicode.com/comments',
            items: []
        }
    },
    methods: {
        getData(url) {
            return fetch(url).then(dataReceived => dataReceived.json())
        }
    },
    mounted() {
        this.getData(this.url).then(data => {
            this.items = data
        })
    }
}
</script>
