<template>
  <form action="#" class="search-form">
    <input type="text" class="search-field" @input="update" :value="value" />
    <button class="btn-search">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<script>
  export default {
    name: "search-menu",
    props: {
      value: String,
      default: "default",
    },
    methods: {
      update(event) {
        this.$emit('input', event.target.value);
      }
    }
  }
</script>

<style>
</style>
