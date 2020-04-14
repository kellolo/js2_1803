let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser')
let server = express();
let catalogDb = './server/db/catalog.json'
let cartDb = './server/db/cart.json'
server.use(express.json());
//server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/catalog', (req, res) => {
    fs.readFile(catalogDb, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})
server.get('/cart', (req, res) => {
    fs.readFile(cartDb, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})

server.post('/cart', (req, res) => {
        fs.readFile(cartDb, 'utf-8', (err, data) => {
            if(!err) {
                let cart = JSON.parse(data);
                let item = req.body;
                cart.push(item);
             writeTo(JSON.stringify(cart, null, ' ', cartDb, res))
               } else {
                   console.log('error')
               }      
   })
})
function writeTo(obj, file, res) {
    fs.writeFile(file, obj, (err) => {
        if(err) {
            res.send('{"result": 0}')
          } else {
           res.send('{"result": 1}')
          }          
      })
      }

server.listen(8080, () => {
    console.log('Server listen @ port 8080')
})




/*
let readFile = '';
let newObj = {
    "id_product": 890,
    "product_name": "Монитор",
    "price": 19200
  };
fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
    if(!err) {
        let arr = JSON.parse(data)
        arr.push(newObj)
        writeTo(JSON.stringify(arr, null, ' '),'./server/db/catalog.json')
            //readFile = data
            //console.log(readFile)
    } else {
        console.log('error')
    }
}); 
 
setTimeout(() => {
    console.log(readFile)
}, 1000)

function writeTo(obj, file) {
  fs.writeFile(file, obj, (err) => {
        if(err) {
            console.log('Error write file')
        }
       
    })
}
*/ 