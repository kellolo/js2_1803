
console.log("Hello, I'm server");

let fs = require('fs')
let express = require('express');

let server = express();
server.use(express.json());

server.get('/', (request, response) => {
  response.send('Hello "Teapot" :)');
})

server.get('/catalog.json', (request, response) => {
  fs.readFile("./server/db/catalogData.json", 'utf-8',
    (err, data) => {
      if (!err) {
        // response.json(data);
        response.send(data)
      }
    })
})

server.get('/basket.json', (request, response) => {
  fs.readFile("./server/db/getBasket.json", 'utf-8',
    (err, data) => {
      if (!err) {
        // response.json(data);
        response.send(data)
      }
    })
})

server.post('/delbasket.json', (request, response) => {
  let delObj = request.body;
  fs.readFile("./server/db/getBasket.json", 'utf-8',
    (err, data) => {
      if (!err) {
        let basket = JSON.parse(data);
        let inBasket = basket.contents.filter(b => b.id_product === delObj.id_product);
        if (inBasket) {
          basket.contents = basket.contents.filter(b => b.id_product !== delObj.id_product);
          fs.writeFile("./server/db/getBasket.json", JSON.stringify(basket, null, " "), err => {
            response.json({'result': err ? 0 : 1})
          })
        }
      } else {
        response.json({'result': 0})
      }
    })
})

server.post('/tobasket.json', (request, response) => {
  let addObj = request.body;
  fs.readFile("./server/db/getBasket.json", 'utf-8',
    (err, data) => {
      if (!err) {
        let basket = JSON.parse(data);
        let inBasket = basket.contents.find(b => b.id_product === addObj.id_product);
        if (inBasket) {
          inBasket.quantity++;
        } else {
          basket.contents.push(Object.assign({}, addObj, {quantity: 1}));
        }
        fs.writeFile("./server/db/getBasket.json", JSON.stringify(basket, null, " "), err => {
          response.json({'result': err ? 0 : 1})
        })
      } else {
        response.json({'result': 0})
      }
    })
})

server.listen(8880, () => {
  console.log('server listen @8880...');
});


