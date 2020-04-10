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
          <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity"></div>
          </div>
          <hr />
          <!-- <div class="cart-items"></div> -->
          <cart ref="cartRef"/>
          <hr />
          <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
            <!-- <div id="price">{{}}</div> -->
          </div>
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
  },
};
</script>
<style></style>
