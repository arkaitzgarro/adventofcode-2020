const path = require('path')

const { readFile } = require('../common/file-utils')

readFile(path.resolve('day-02/input.txt')).then(function(data) {
  const passwords = data.trim().split('\n').map((password) => {
    const match = password.match(/([0-9]+)-([0-9]+)\s([a-z]):\s(.+)/)
    return {
      position1: match[1] - 1,
      position2: match[2] - 1,
      letter: match[3],
      pass: match[4],
    }
  })

  const validPasswords = passwords.reduce((validCount, password) => {
    const char1 = password.pass.charAt(password.position1)
    const char2 = password.pass.charAt(password.position2)

    return char1 !== char2 && (char1 === password.letter || char2 === password.letter) ? validCount + 1 : validCount
  }, 0)

  console.log(validPasswords)
})
