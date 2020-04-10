<template>
  <div class="products">
    <item v-for="item of items" :key="item.id_product"  :item="item"/>
  </div>
</template>

<script>
import item from "../components/item.vue";
export default {
  components: { item },
  data() {
    return {
      items: [],
      url: "/api/catalog"
      //url: "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json",
    };
  },
   methods: {
     addToCart(item){
       this.$parent.$refs.cartRef.addToCart(item)
     }
  },

  // computed: {},

  mounted() {
    this.$parent.getData(this.url).then((data) => {
      this.items = data;
    });
  },
};
</script>
