<template>
    <div class="cart-items">
      <div class="d-flex">
            <strong class="d-block">Всего товаров: {{countItems}}</strong>
            <div id="quantity"></div>
          </div>
          <hr />
        <item v-for="item of items" :key="item.id_product"  :item="item" :type="'cart'" @remove="removeFromCart"/>
    <hr />
          <div class="d-flex">
            <strong class="d-block">Общая ст-ть: {{totalSum}}</strong>
            
          </div>
    </div>
</template>

<script>
import item from "../components/item.vue";
export default {
  components: { item },
  data() {
    return {
      totalSum: null,
      countItems: null,
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
        
        this.getSum()
    },
    removeFromCart(item){
      let id = item.id_product
        let find = this.items.find (product => product.id_product === id)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice (this.items.indexOf(find), 1)
        }
         
        this.getSum() 
    }

  },

  computed: {
    getSum (){
      let qua = 0
      let pr = 0
        this.items.forEach (item => {
            qua += item.quantity
            pr += item.price * item.quantity
        })
        this.countItems = qua
        this.totalSum = pr
    }
  },

  mounted() {
    this.$parent.getData(this.url).then((data) => {
      this.items = data.contents;
    });
  },
};
</script>