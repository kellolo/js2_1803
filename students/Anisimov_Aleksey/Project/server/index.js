const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

let server = express()
let catalogDB = 'server/db/catalog.json'
let cartDB = 'server/db/cart.json'
let arr = []
server.use(express.json())
server.use(bodyParser.json())
//console.log(path.resolve())

// fs.stat(catalogDB, (err, stats) => {
//     if (!err) {
//         console.log(err);
//     }
//     console.log('File size: ' + Math.round(stats.size) / 1024 + ' Kb')
// })
server.post('/addtocart', (req, res) => {
    fs.readFile(cartDB, 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}')
        } else {
            arr = req.body
            // let targetItem = req.body
            // if (data.length != 0) {
            //     arr = JSON.parse(data)
            // }
            // arr.push(targetItem)
            fs.writeFile(cartDB, JSON.stringify(arr), (err) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send('{"result": 1}') 
                }
            })
        }
        
    })
})

server.get('/catalog', (err, res) => {
    fs.readFile(catalogDB, 'utf-8', (err,data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log('Ахтунг ' + err)
        }
    })
})

server.get('/cart', (err, res) => {
    fs.readFile(cartDB, 'utf-8', (err,data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log('Ахтунг ' + err)
        }
    })
})

server.listen(8080, () => {console.log('server run on 8080')})