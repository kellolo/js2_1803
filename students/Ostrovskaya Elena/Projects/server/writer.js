let fs = require('fs')
module.exports  = {
    writeTo(arr, file, res) {
        fs.writeFile(file, arr, (err) => {
            if (!err) {
                res.send ('{"result": 1}')
            } else {
                res.sendStatus (500, '{"result": 0}')
            }
        })
    }
}