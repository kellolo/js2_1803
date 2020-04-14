let fs = require('fs');
let express = require('express');
let server = express();
server.use(express.json());

let catalogDB = './server/db/catalog.json'
let cartDB = './server/db/cart.json'

let cart = require('./cart.js')
let writer = require('./writer.js')

server.get('/catalog', (req, res) => {
    fs.readFile(catalogDB, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }else{
            console.log('Error read file')
        }
    })
})

server.get('/cart', (req, res) => {
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }else{
            console.log('Error read file')
        }
    })
})

server.post('/catalog', (req, res)=>{
    fs.readFile(catalogDB, 'utf-8', (err, data) => {
       if (!err) {
            let arr = JSON.parse(data);
            arr.push(req.body);
           
            writer.writeTo(JSON.stringify(arr, null, ' '), catalogDB, res);
        } else {
           console.log('Error read file')
        }
    })
})

server.post('/cart', (req, res)=>{
     fs.readFile(cartDB, 'utf-8', (err, data) => {
        if (!err) {
            let arr = cart.getCartWithObj(data, req.body);
            
            cart.changeSum(arr);
            cart.changeCount(arr);
            
            writer.writeTo(JSON.stringify(arr, null, ' '), cartDB, res);
        } else {
            console.log('Error read file')
        }
    })
})

server.put('/cart', (req, res)=>{
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if (!err) {
            let arr = cart.getModifiedCart(data, req.body);

            cart.changeSum(arr);
            cart.changeCount(arr);

            writer.writeTo(JSON.stringify(arr, null, ' '), cartDB, res)
        } else {
            console.log('Error read file')
        }
    })
})

server.delete('/cart', (req, res)=>{
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if (!err) {   
            let arr = cart.getCartWithoutObj(data, req.body);

            cart.changeSum(arr);
            cart.changeCount(arr);

            writer.writeTo(JSON.stringify(arr, null, ' '), cartDB, res)
        } else {
            console.log('Error read file')
        }
    })
})


server.listen(8080, () => { console.log('server listen @ 8080...') })




