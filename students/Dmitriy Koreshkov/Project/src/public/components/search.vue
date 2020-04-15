<template>
  <div>
      <form action="#" class="search-form">
          <input type="text" class="search-field" v v-model="searchQuery" />
          <!-- как-то обратиться к методу в каталоге ?-->
          <button class="btn-search" @click="searchProductInCatalog(searchQuery)">
            <i class="fas fa-search"></i>
          </button>
        </form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            searchQuery: ""
        }
    },
}
</script>

