<template>
  <div class="product-item">
    <img :src="item.img" width="300" height="200" :alt="item.product_name">
    <div class="desc">
      <h1>{{item.product_name}}</h1>
      <p>${{item.price}}</p>
      <button class="buy-btn" name="buy-btn" @click="$emit('addtocart', item)">Купить</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "catalogItem",
    props: {
      item: {
        type: Object
      }
    }
  }
</script>

<style>
</style>
