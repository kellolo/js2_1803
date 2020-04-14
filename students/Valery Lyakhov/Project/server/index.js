let fs = require('fs')                                                          // модуль (файл сервис для подзагрузки в проект)
let express = require('express')                                                // подгрузить модуль

let server = express()                                                          // создать сервер выполнив в него запуск конструкции express

let catalogDB = './server/db/catalog.json'                                      // ссылка на каталог

server.use(express.json())                                                      // сервер исполбзует модуль express

// server.get('/', (request, response) => {                                     // сервер обрабатывает get запрос по адресу
//     response.send('Hello stranger are you 18 years old?')                    // сообщение функции с параметрами 1-реквест 2-респанс
// })

server.get('/catalog', (req, res) => {                                          //  
    fs.readFile(catalogDB, 'utf-8', (err, data) => {                            //
        if(!err) {                                                              // 
            res.send(data)                                                      // отправляю 
        }
    })
})

server.listen(8080, () => { console.log('server listen @ 8080...') })          // сервер слушает какой порт сообщаем 
// let readFile = ''                                                           // функицию сервер 'server listen @ 8080...'

// let newObj = {                                                               Добавления нового объекта
//     "id_product": 678,
//     "product_name": "Холодильник",
//     "price": 10000
//   }


// fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {            Прочитать файл 1-файл 2-кодировка 3 колбек функция,
//     if (!err) {                                                              которая может содержать в себе ошибку. 
//         let arr = JSON.parse(data)                                           Если ошибки нет записываю в переменную, что прочитал с файла
//         arr.push(newObj)                                                     let.arr переменая в которую записываем новый объект
//         writeTo(JSON.stringify(arr, null, ' '), './server/db/catalog.json')  вызвы функции в которую сообщаем параметр (путь к нему)
        
//     } else {                                                                 В ином случае в консоль выводим ошибку чтения файла
//         console.log('ERR READING FILE!!!')
//     }
// })

// function writeTo (obj, file) {                                               Функция добавления нового объекта, (принимает obj и file)
//     fs.writeFile(file, obj, (err) => {                                       которая будет принимать какой-нибудь объект, файл + метод серверный
//         if(err) {                                                            работы с файлами fs.writeFile с третмя параметрами
//             console.log('ERR write file')                                    file -куда записывать, 
//         }                                                                    obj -что записывать,
//     })                                                                       err -функция колбек котрая может содержать какую-то ошибку
// }


// setTimeout(() => {   
//     console.log(readFile)
// }, 1000)