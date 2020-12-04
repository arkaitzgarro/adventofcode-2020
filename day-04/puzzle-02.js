const path = require('path')

const { readFile } = require('../common/file-utils')

readFile(path.resolve('day-04/input.txt')).then(function(data) {
  const iterator = readPassports(data)

  let validCount = 0
  let result = iterator.next();
  while (!result.done) {
    validCount += validPassport(result.value) ? 1 : 0
    result = iterator.next();
  }

  console.log(validCount)
})

function validPassport(passport) {
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  // hgt (Height) - a number followed by either cm or in:
  // If cm, the number must be at least 150 and at most 193.
  // If in, the number must be at least 59 and at most 76.
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  // cid (Country ID) - ignored, missing or not.
  const rules = [
    {
      exp: /byr:([0-9]{4})/,
      test([, value]) {
        return parseInt(value) >= 1920 && parseInt(value) <= 2002
      }
    }, {
      exp: /iyr:([0-9]{4})/,
      test([, value]) {
        return parseInt(value) >= 2010 && parseInt(value) <= 2020
      }
    }, {
      exp: /eyr:([0-9]{4})/,
      test([, value]) {
        return parseInt(value) >= 2020 && parseInt(value) <= 2030
      }
    }, {
      exp: /hgt:([0-9]{2,3})(cm|in)/,
      test([, value, metric]) {
        if (metric === 'cm') {
          return parseInt(value) >= 150 && parseInt(value) <= 193
        }

        return parseInt(value) >= 59 && parseInt(value) <= 76
      }
    }, {
      exp: /hcl:(#[0-9a-f]{6})/,
      test() {
        return true
      }
    }, {
      exp: /ecl:(amb|blu|brn|gry|grn|hzl|oth)/,
      test() {
        return true
      }
    }, {
      exp: /pid:([0-9]{9})\b/,
      test() {
        return true
      }
    },
  ]

  for(const rule of rules) {
    const match = passport.match(rule.exp)
    if (!match || !rule.test(match)) {
      return false
    }
  }

  return true
}

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
