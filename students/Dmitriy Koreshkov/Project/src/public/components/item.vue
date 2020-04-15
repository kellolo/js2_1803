 <template>
  <div :class="type.match(/catalog|temp/i) ? 'product-item' : 'cart-item'">
    <template v-if="type === 'catalog'">
      <img :src="imgCompute" :alt="item.product_name" />
      <div class="desc">
        <h1>{{item.product_name}}</h1>
        <p>{{item.price}}</p>
        <button class="buy-btn" @click="$parent.addToCart(item)">Купить</button>
      </div>
    </template>

    <template v-if="type === 'cart'">
      <div :class="type === 'cart' ? 'cart-item' : 'product-item'">
        <img :src="imgCompute" :alt="item.product_name" />
        <div class="product-desc">
          <p class="product-title">{{item.product_name}}</p>
          <p class="product-quantity">{{item.quantity}}</p>
          <p class="product-single-price">{{item.price}}</p>
        </div>
        <div class="right-block">
          <button class="del-btn" @click="$emit('remove', item)">&times;</button>
        </div>
      </div>
    </template>

    <template v-if="type === 'temp'">
      <img :src="'https://placehold.it/300x200'" :alt="'some imege'" />
      <div class="desc">
        <label>
          <input
            type="text"
            class="new-item"
            placeholder="Название товара"
            v-model="newProduct.product_name"
          />
        </label>
        <label>
          <input
            type="number"
            class="new-item"
            placeholder="Стоимость товара"
            v-model="newProduct.price"
          />
        </label>
        <button class="buy-btn" @click="createNew()">Добавить</button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: {
        product_name: "",
        price: null,
      }
    };
  },
  props: {
    type: {
      type: String,
      default: "catalog"
    },
    item: {
      type: Object
    }
  },
  computed: {
    imgCompute() {
      return `https://placehold.it/${
        this.type === "catalog" ? "300x200" : "100x80"
      }`;
    }
  },
  methods: {
      createNew(){
          
          this.$emit('create', this.newProduct);
          this.newProduct.product_name = ""
          this.newProduct.price = null
      }
  },
};
</script>