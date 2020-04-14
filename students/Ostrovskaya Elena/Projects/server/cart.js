module.exports  = {
    getCartWithObj(data, obj){
        let arr = JSON.parse(data);
        arr.contents.push(obj);
        return arr
    },
    getModifiedCart(data, obj){
        let arr = JSON.parse(data);
        let product = arr.contents.find(product => product.id_product === obj.id_product);
        product.quantity = obj.quantity;
        return arr
    },
    getCartWithoutObj(data, obj){
        let arr = JSON.parse(data);
        let product = arr.contents.find(product => product.id_product === obj.id_product);
        arr.contents.splice(arr.contents.indexOf(product), 1); 
        return arr 
    },
    changeSum(arr){
        arr.amount = arr.contents.reduce((sum, item)=> sum += +item.price * +item.quantity, 0)
    },
    changeCount(arr){
        arr.countGoods = arr.contents.reduce((count, item)=> count +=  +item.quantity, 0)
    },
}