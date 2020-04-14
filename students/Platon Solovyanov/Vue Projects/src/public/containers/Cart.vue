<template>
  <div class="cart-block" v-show="showCart">
    <div class="d-flex">
      <strong class="d-block">Всего товаров</strong>
      <div id="quantity">{{count}}</div>
    </div>
    <hr />
    <div class="cart-items">
      <item v-for="item of items" :key="item.id_product" :type="'cart'" :item="item" />
    </div>
    <hr />
    <div class="d-flex">
      <strong class="d-block">Общая ст-ть:</strong>
      <div id="price">{{sum}}</div>
    </div>
  </div>
</template>

<script>
import item from "../components/Item.vue";
export default {
  components: { item: item },
  data() {
    return {
      items: [],
      count: null,
      sum: null,
      showCart: false,
      name: "cart",
      url:
        "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json"
    };
  },
  methods: {
    addProduct(product) {
      let id = product.id_product;
      let find = this.items.find(product => product.id_product === id);
      let obj = Object.assign({}, product, { quantity: 1 });
      if (find) {
        find.quantity++;
      } else {
        this.items.push(obj);
      }
      this.count = this.getCount;
      this.sum = this.getSum;
    },
    deleteProduct(product) {
      let id = product.id_product;
      let find = this.items.find(product => product.id_product === id);
      if (find.quantity > 1) {
        find.quantity--;
      } else {
        this.items.splice(this.items.indexOf(find), 1);
      }
      this.count = this.getCount;
      this.sum = this.getSum;
    }
  },
  computed: {
    getSum() {
      return this.items.reduce(
        (sum, item) => (sum += +item.price * +item.quantity),
        0
      );
    },
    getCount() {
      return this.items.reduce((count, item) => (count += +item.quantity), 0);
    }
  },
  mounted() {
    this.$parent
      .getData(this.url)
      .then(result => {
        this.items = result.contents;
        this.sum = result.amount;
        this.count = result.countGoods;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>