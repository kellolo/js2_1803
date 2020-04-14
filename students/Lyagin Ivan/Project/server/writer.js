let fs = require('fs')

module.exports = async function (file, data) {
    let stat = true
    try {
        fs.writeFile(file, JSON.stringify(data, null, ' '), (err) => {
            if(err) {
                status = false
            }
        })
    }
    finally {
        return stat
    }
}