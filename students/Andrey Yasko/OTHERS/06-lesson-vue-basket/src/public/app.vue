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
                <button class="btn-cart" @click="$refs.cart.cart_show = !$refs.cart.cart_show">Cart</button>
                <cart ref="cart" />
            </div>
        </header>
        <main>
            <catalog ref="catalog" />
        </main>
    </div>
</template>

<script>
//add packages (imports)
import catalog from './containers/Catalog.vue'
import cart from './containers/Cart.vue'
export default {
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