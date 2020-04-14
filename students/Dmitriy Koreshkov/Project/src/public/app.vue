<template>
  <div>
    <header>
      <div class="logo">E-shop</div>
      <div class="cart">
        <form action="#" class="search-form">
          <input type="text" class="search-field" />
          <button class="btn-search">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button @click="showCart =!showCart" class="btn-cart">{{showCart ? "Cкрыть" : "Показать"}} корзину</button>
        <div class="cart-block" v-show="showCart">
          
          <!-- <div class="cart-items"></div> -->
          <cart ref="cartRef"/>
          
        </div>
      </div>
    </header>
    <main>
      <catalog  />
    </main>
  </div>
</template>

<script>
import catalog from "./containers/catalog.vue";
import cart from "./containers/cart.vue";
export default {
  components: { catalog, cart },
  data() {
    return {
      showCart: false,
    };
  },  

  methods: {
    getData(url) {
      return fetch(url).then((dataReceived) => dataReceived.json());
    },
    postData(url, item){
      return fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "aplication/json"},
        body: JSON.stringify(item)
      }).then(d => d.json())
    },
    putData(url, delta){
      return fetch(url, {
        method: 'PUT',
        headers: {"Content-Type": "aplication/json"},
        body: JSON.stringify(delta)
      }).then(d => d.json())
    },
    deleteData(url){
      return fetch(url, {
        method: 'DELETE',
        headers: {"Content-Type": "aplication/json"},
      }).then(d => d.json())
    }
  },
};
</script>
<style></style>
