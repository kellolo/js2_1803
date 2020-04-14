let fs = require('fs')

let express = require('express')

let server = express()

let catalogDB = './server/db/catalog.json'

let cartDB = './server/db/cart.json'

server.listen(8080, () => { console.log('server listen @ 8080...') })

server.use(express.json())

server.get('/catalog', (req, res) => {
    fs.readFile(catalogDB, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})

server.get('/cart', (req, res) => {
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})

function writeTo (obj, file) {
    fs.writeFile(file, obj, (err) => {
        if (err) {
            console.log('ERR write file')
        }
    })
}

server.post('/cart', (req, res)=>{
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if (!err) {
            let arr = JSON.parse(data)
                
            writeTo(JSON.stringify(arr, null, ' '), cartDB)
        } else {
           console.log('Error read file')
        }
    })
})



