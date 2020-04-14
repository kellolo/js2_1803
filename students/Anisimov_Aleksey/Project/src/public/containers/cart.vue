<template>
    <div class="cart">
        <button @click="showCart()" class="cart__button">Корзина</button>
        <div class="cart__counter">{{ totalCartItems }}</div>
        <div class="cart__empty" v-show="isEmptyCart">Корзина пуста</div>
        <div class="cart__block" v-show="isVisibleCart">
          <p class="cart__p">Всего товаров: {{ totalCartItems }} шт.</p>
          <hr class="cart__hr">
          
          <item v-for="item of this.items" :key='item.id' :item='item' type='cart' @remove='removeFromCart'/>

          <hr class="cart__hr">
          <p class="cart__p">Общая стоимость: ${{ totalCartSUmm }}</p>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        item: () => import('../components/item')
    },
    data() {
        return {
            items: [],
            isVisibleCart: false,
            isEmptyCart: false
        }
    },
    methods: {
        isCartEmpty() {
            if (this.items.length === 0) {
                return true
            }
            return false
        },
        hideCart() {
            if (this.isCartEmpty()) {
                this.isVisibleCart = false
            }
        },
        showCart() {
            if (this.items.length === 0) {
                this.isEmptyCart = !this.isEmptyCart
                this.isVisibleCart = false
            } else {
                this.isVisibleCart = !this.isVisibleCart
                this.isEmptyCart = false
            }
        },
        
        removeFromCart(el) {
            this.items = this.items.filter(item => item.id !== el.id)
            this.hideCart()
        },
        
    },
    computed: {
        totalCartItems() {
            let totalQtt = null
            this.items.forEach(element => {
                totalQtt += element.quantity
            });
            return totalQtt
        },
        totalCartSUmm() {
            let totalSumm = null
            this.items.forEach(element => {
                totalSumm += element.summ
            });
            return totalSumm
        }
    },
    updated() {
        if (!this.isCartEmpty) {
            this.isEmptyCart = false
        }
    }
    
}
</script>