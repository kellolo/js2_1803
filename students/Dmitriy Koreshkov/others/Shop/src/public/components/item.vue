 <template>
    <div :class="type === 'catalog' ? 'product-item' : 'cart-item'">
        <template v-if="type === 'catalog'">
            <img :src="imgCompute" :alt="item.product_name">
            <div class="desc">
                <h1>{{item.product_name}}</h1>
                <p>{{item.price}}</p>
                <button class="buy-btn" @click="$parent.addToCart(item)" >Купить</button>
            </div>   
        </template>

        <template v-if="type === 'cart'">
        <div :class="type === 'cart' ? 'cart-item' : 'product-item'">
            <img :src="imgCompute" :alt="item.product_name">
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
    </div>    

</template>

<script>
export default {
    props: {
        type:{
            type: String,
            default: "catalog"
        },
        item: {
            type: Object 
        }
    },
    computed: {
        imgCompute(){
            return `https://placehold.it/${this.type === 'catalog' ? '300x200' : '100x80'}`
        }
    },
}
</script>