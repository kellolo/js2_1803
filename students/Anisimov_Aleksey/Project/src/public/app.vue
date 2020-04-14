<template>
  <div>
    <div class="header center">
      <div class="search">
        <input type="text" v-model="searchStr" maxlength="20" @keyup.enter="checkSearchStr" />
        <button class="search__button" type="button" @click="checkSearchStr">Искать</button>
      </div>
      
      <cart ref="cartRef" />

    </div>
    <main>
        <catalog ref="catalogRef" />
    </main>
  </div>

</template>

<script>
//import catalog from './containers/catalog'
//import cart from './containers/cart'
export default {
    name: 'App',
    components: {
      catalog: () => import('./containers/catalog'),
      cart: () => import('./containers/cart')
    },
    data() {
      return  {
        searchStr: '',
        whiteListRegExp: /[^0-9a-zа-я.-\s]/gi, //для строки поиска
      }
    },
    methods: {
      sendData(url, obj) {
        return fetch(url, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj) //['id', 'title', 'price']
        })
            .then(dataResived => dataResived.json())
      },
      getData(url) {
        return fetch(url).then(dataResived => dataResived.json())
      },
      checkSearchStr() { // приводим строку поиска к норм формату
            this.searchStr = (this.searchStr.trim()).replace(/\s{2,}/g, ' ') // сначала тримим, потом азмена множественных пробелов на один
            this.searchStr = this.searchStr.replace(this.whiteListRegExp, '') // тут делаем замену в строке, останутся только разрешенные символы
            this.$refs.catalogRef.filterGoods(this.searchStr)
      }
    }
};
</script>

<style lang="sass">
</style>