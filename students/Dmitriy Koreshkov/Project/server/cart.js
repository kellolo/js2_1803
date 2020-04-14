module.exports = {
    add(cart, item){ 
        let newCart = cart
        newCart.contents.push(item)
        return newCart
    },
    change(cart, item){
        return cart
    },
    delete(cart, item){
        return cart
    },
    _search(){

    },

}