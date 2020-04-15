<template>
  <div>
    <header>
      <div class="logo">E-shop</div>
      <search />
      <div class="cart">
        <button @click="showCart =!showCart" class="btn-cart">{{showCart ? "Cкрыть" : "Показать"}} корзину</button>
        <div class="cart-block" v-show="showCart">
          
          <cart ref="cartRef"/>
          
        </div>
      </div>
    </header>
    <main>
      <catalog ref="catalogRef"/>
    </main>
  </div>
</template>

<script>
import catalog from "./containers/catalog.vue";
import cart from "./containers/cart.vue";
import search from "./components/search.vue";
export default {
  components: { catalog, cart, search },
  data() {
    return {
      showCart: false,
    };
  },  

  methods: {
    getData(url) {
      return fetch(url).then(dataReceived => dataReceived.json())
    },
    postData(url, item){
      return fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
      }).then(d => d.json())
    },

    putData(url, delta){
      return fetch(url, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(delta)
      }).then(d => d.json())
    },
    deleteData(url){
      return fetch(url, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
      }).then(d => d.json())
    }
  },

};
</script>
<style></style>
