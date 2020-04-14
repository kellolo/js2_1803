<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <div class="cart">
                <search />
                <button class="btn-cart" @click="cart_show = !cart_show">Cart</button>
                <cart v-show="cart_show" ref="cartRef" />
            </div>
        </header>
        <main>
            <catalog ref="catalogRef" />
        </main>
    </div>
</template>

<script>
//add packages (imports)
import catalog from './containers/Catalog.vue'
import cart from './containers/Cart.vue'
import search from './components/search.vue'
export default {
    components: { catalog, cart, search },
    data(){
        return{
            cart_show: false
        }
    },
    methods: {
        getData(url) {
            return fetch(url).then(dataReceived => dataReceived.json())
        },
        postData(url, obj){
            try {
                const response = await fetch(url, {
                    method: 'POST', // или 'PUT'
                    body: JSON.stringify(obj), // данные могут быть 'строкой' или {объектом}!
                    headers: {'Content-Type': 'application/json'}
                });
                const json = await response.json()
                console.log('Успех:', JSON.stringify(json))
            } catch (error) {
                console.error('Ошибка:', error)
            }
        },
        changeData(url, obj){
            try {
                const response = await fetch(url, {
                    method: 'PUT', // или 'PUT'
                    body: JSON.stringify(obj), // данные могут быть 'строкой' или {объектом}!
                    headers: {'Content-Type': 'application/json'}
                });
                const json = await response.json()
                console.log('Успех:', JSON.stringify(json))
            } catch (error) {
                console.error('Ошибка:', error)
            }
        }

    
    //     postData (url, obj) {
    //         return fetch(url, {
    //             method: 'POST',
    //             headers: {"Content-Type": "application/json"},
    //             body: JSON.stringify(obj)
    //         }).then(data => data.json())
    //     },
    //     changeData (url, obj) {
    //         return fetch(url, {
    //             method: 'PUT',
    //             headers: {"Content-Type": "application/json"},
    //             body: JSON.stringify(obj)
    //         }).then(data => data.json())
    //     },
    //     deleteData(url, obj) {  
    //         return fetch(url, {
    //             method: 'DELETE',
    //             headers: {"Content-Type": "application/json"},
    //             body: JSON.stringify(obj)
    //         }).then(data => data.json())
    //     }

    }

}
</script>

<style>

</style>