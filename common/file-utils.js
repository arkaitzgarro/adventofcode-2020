const fs = require('fs')

module.exports.readFile = function readFile(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8' , (error, data) => {
      if (error) {
        return reject(error)
      }

      resolve(data)
    })
  })
}
