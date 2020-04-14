<template>
  <div class="modal">
    <div class="msg">
      <h1>Псевдомодальное окно</h1>
      <hr>
      <div>{{value}}</div>
      <hr>
      <button @click="$emit('closeModal')" autofocus>Close</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "showDialog",
    data() {
      return {
        value: '',
      }
    },
  }
</script>

<style>
</style>
