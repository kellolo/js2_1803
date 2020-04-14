<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <div class="cart">
                <form action="#" class="search-form">
                    <input type="text" class="search-field">
                    <button class="btn-search">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
                <button class="btn-cart" @click="showCart = !showCart">Cart</button>
                <cart v-show="showCart" ref="cartRef"/>
            </div>
        </header>
        <main>
            <catalog ref="catalogRef" />
        </main>
    </div>
</template>

<script>
//add packages (imports)
import catalog from '../containers/Catalog.vue'
import cart from '../containers/Cart.vue'
export default {
    components: { catalog, cart },
    data() {
        return {
            showCart: false
        }
    },
    methods: {
        getData(url) {
            return fetch(url).then(dataReceived => dataReceived.json())
        },
        postData(url, item) {
            return fetch(url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(item)
            }).then(d => d.json())
        },
        putData(url, delta) {
            return fetch(url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(delta)
            }).then(d => d.json())
        },
        deleteData(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
            }).then(d => d.json())
        },
    }
}
</script>

<style>

</style>