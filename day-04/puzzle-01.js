const path = require('path')

const { readFile } = require('../common/file-utils')

readFile(path.resolve('day-04/input.txt')).then(function(data) {
  const iterator = readPassports(data)

  // byr (Birth Year)
  // iyr (Issue Year)
  // eyr (Expiration Year)
  // hgt (Height)
  // hcl (Hair Color)
  // ecl (Eye Color)
  // pid (Passport ID)
  // cid (Country ID) (Optional)
  const validPassport = /^(?=.*byr)(?=.*iyr)(?=.*eyr)(?=.*hgt)(?=.*hcl)(?=.*ecl)(?=.*pid).*$/

  let validCount = 0
  let result = iterator.next();
  while (!result.done) {
   validCount += validPassport.test(result.value) ? 1 : 0
   result = iterator.next();
  }

  console.log(validCount)
})

function* readPassports(data) {
  const lines = data.split('\n')

  const passport = []
  for (const line of lines) {
    if (line.trim() === '') {
      yield passport.join(' ')
      passport.length = 0
    }

    passport.push(line)
  }
}
