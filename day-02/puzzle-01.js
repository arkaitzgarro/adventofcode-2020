const path = require('path')

const { readFile } = require('../common/file-utils')

readFile(path.resolve('day-02/input.txt')).then(function(data) {
  const passwords = data.trim().split('\n').map((password) => {
    const match = password.match(/([0-9]+)-([0-9]+)\s([a-z]):\s(.+)/)
    return {
      min: match[1],
      max: match[2],
      letter: match[3],
      pass: match[4],
    }
  })

  const validPasswords = passwords.reduce((validCount, password) => {
    const regEx = new RegExp(password.letter, 'g');

    const occurrences = password.pass.match(regEx)
    if (!occurrences) {
      return validCount
    }

    return occurrences.length >= password.min && occurrences.length <= password.max ? validCount + 1 : validCount
  }, 0)

  console.log(validPasswords)
})
