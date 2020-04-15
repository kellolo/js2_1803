module.exports = {
    add(cart, item){ 
        let newCart = cart
        newCart.contents.push(item)
        return newCart
    },
    change(cart, req){
        let newCart = cart
        let find = this._search(newCart.contents, req.params.id)
        find.quantity += req.body.delta
        return newCart
    },
    delete(cart, req){
        let newCart = cart
        let find = this._search(newCart.contents, req.params.id)
        newCart.contents.splice(newCart.contents.indexOf(find), 1)
        return newCart
    },
    _search(arr, id){
        return arr.find(el => el.id_product == id)
    },

} 