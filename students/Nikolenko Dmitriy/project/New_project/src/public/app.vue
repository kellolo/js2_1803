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
            <cart v-show="showCart" ref="cartRef" />
        </div>
    </header>
    <main>
        <catalog ref="catalogRef"/>
    </main>
    
</div>
</template>
<script>

import catalog from './containers/Catalog.vue'
import cart from './containers/Cart.vue'
export default {
    data() {
        return {
            showCart: false
        }
    },
    components: { catalog, cart },
    methods: {
         getData(url) {
        return fetch(url).then(dataReceived => dataReceived.json())
    }
    }
}
</script>
<style>

</style>


