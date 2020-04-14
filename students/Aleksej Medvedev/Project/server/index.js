let fs = require('fs')
let express = require('express')

let server = express()

let catalogDB = './server/db/catalog.json'

server.use(express.json())

// server.get('/', (request, response) => {
//     response.send('Hello stranger are you 18 years old?')
// })

server.get('/catalog', (req, res) => {
    fs.readFile(catalogDB, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})

server.listen(8080, () => { console.log('server listen @ 8080...') })
// let readFile = ''

// let newObj = {
//     "id_product": 678,
//     "product_name": "Холодильник",
//     "price": 10000
//   }

// fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
//     if (!err) {
//         let arr = JSON.parse(data)
//         arr.push(newObj)
//         writeTo(JSON.stringify(arr, null, ' '), './server/db/catalog.json')
        
//     } else {
//         console.log('ERR READING FILE!!!')
//     }
// })

// function writeTo (obj, file) {
//     fs.writeFile(file, obj, (err) => {
//         if(err) {
//             console.log('ERR write file')
//         }
//     })
// }


// setTimeout(() => {
//     console.log(readFile)
// }, 1000)