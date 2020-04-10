<template>
    <div class="cart-items">
        <item v-for="item of items" :key="item.id_product"  :item="item" :type="'cart'" @remove="removeFromCart"/>
    </div>
</template>

<script>
import item from "../components/item.vue";
export default {
  components: { item },
  data() {
    return {
      items: [],
      url: "/api/cart"
      //url:"https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json",
    };
  },
  methods: { 
    addToCart(item){
      let id = item.id_product
        let find = this.items.find (product => product.id_product === id)
        if (find) {
            find.quantity++
        } else {
            let newItem = Object.assign({}, item, {quantity: 1})
            this.items.push (newItem)
        }
         
        //this._checkTotalAndSum ()
        //this.render ()
    },
    removeFromCart(item){
      let id = item.id_product
        let find = this.items.find (product => product.id_product === id)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice (this.items.indexOf(find), 1)
        }
         
        //this._checkTotalAndSum ()
        //this.render ()
    }

  },

  // computed: {},

  mounted() {
    this.$parent.getData(this.url).then((data) => {
      this.items = data.contents;
    });
  },
};
</script>