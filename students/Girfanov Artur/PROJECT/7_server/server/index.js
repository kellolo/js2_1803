let fs = require('fs')
let express = require('express')
let server = express()

let catalogDB = './server/db/catalog.json'
let cartDB = './server/db/cart.json'

server.use(express.json())

let newObj = {
    "id_product": 555,
    "product_name": "Модем",
    "price": 150
  }


server.get('/catalog', (req, res) => {
    fs.readFile(catalogDB, 'utf-8', (err, data) => {
        if (!err) {
            res.send(data)
        }
    })
})

server.get('/cart', (req, res) => {
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if (!err) {
            res.send(data)
        }
    })
})

function writeTo(obj, file) {
    fs.writeFile(file, obj, (err) => {
        if (err) {
            console.log(`Can't write in file!`)
        }
    })
}

server.post('/cart', (req, res) => {
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if (!err) {
            let arr = JSON.parse(data)
            arr.push(newObj)
            writeTo(JSON.stringify(arr, null, ' '), './server/db/cart.json')
        } else {
            console.log(`Can't read file!`)
        }
    })
})

server.listen(8080, () => {
    console.log('server listen @ 8080...')
})