<template>
  <div class="cart-block ">
    <item :type="'cart'" v-for="item of items" :key="item.id_product" :item="item" @remove="deleteProduct"/>          
 </div>
    
 
</template>

<script>
import item from '../components/Item.vue'
export default {
  

    data() {
        return {
            items: [],
            url: '/api/cart'
           // url: 'https://raw.githubusercontent.com/Dmitriy-Nikolenko/online-store-api/master/responses/getBasket.json'
        }     
    },
      components: {item},

    mounted() {
        this.$parent.getData(this.url)
         .then(data => {
             this.items = data
         })
    } , 
       methods: {
         addProduct(item) {
            let id = item.id_product;
            let find = this.items.find (product => product.id_product === id);
            if (find) {
                find.quantity++; 
            } else {
              let newItem = Object.assign({}, item, {quantity: 1})
              this.items.push (newItem);
        }   
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
          if(request.readyState == 4 && request.status == 200) {
            document.getElementById("app").innerHTML=request.responseText;
          }
          
        }
        request.open("POST", this.url, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(item);

    },
        deleteProduct (item) {
                      let id = item.id_product;
                        let find = this.items.find (product => product.id_product === id);
                        if (find.quantity > 1) {
                      find.quantity--;
                     } else {
                        this.items.splice (this.items.indexOf(find), 1);
                   }                         
                           }
                    


    }

}
</script>
