<template>
  <div class="products">
    <item v-for="item of items" :key="item.id_product" :item="item" @searchProduct="searchProductInCatalog"/>
    <item :type="'temp'" @create="createNewItem" />
  </div>
</template>

<script>
import item from "../components/item.vue";
export default {
  components: { item },
  data() {
    return {
      items: [],
      filtredItems: [],
      url: "/api/catalog"
      //url: "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json",
    };
  },
  methods: {
    addToCart(item) {
      this.$parent.$refs.cartRef.addToCart(item);
    },
    createNewItem(payload) {
      this.$parent.postData(this.url, payload)
      .then(d => {
        if (d._id) {
          this.items.push({
            product_name: payload.name,
            price: payload.price, 
            id_product: d._id
          });
        }
      });
    },
    searchProductInCatalog(searchQuery){
      console.log("'nf inerf djj,ot hf,jnftn?")
      //this.filtredItems = this.items.filter()
    }
  },

  // computed: {},

  mounted() {
    this.$parent.getData(this.url).then(data => {
      this.items = data;
    });
  }
};
</script>