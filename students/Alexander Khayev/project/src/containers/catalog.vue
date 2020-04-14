<template>
  <div class="products">
    <catalogItem :item="item" v-for="item in showItems" :key="item.id_product" @addtocart="_addToCart"/>
  </div>
</template>

<script>
  export default {
    name: "catalog",
    props: {
      value: {
        type: String,
        default: ""
      }
    },
    components: {
      catalogItem: () => import('../components/catalogItem.vue'),
    },
    data() {
      return {
        items: [],
      }
    },
    mounted() {
      this.$parent.getData("/api/catalog.json")
        .then(data => {
          this.items = data;
        })
    },
    methods: {
      _addToCart(item) {
        this.$parent.$refs.cart.addToCart(item);
      },
    },
    computed: {
      showItems() {
        return this.items.filter(item => item.product_name.toLowerCase().includes(this.value));
      }
    },
  }
</script>

<style>
</style>
