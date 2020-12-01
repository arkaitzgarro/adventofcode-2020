const path = require('path')

const { readFile } = require('../common/file-utils')

const EXPECTED_RESULT = 2020
readFile(path.resolve('puzzle-02/input.txt')).then(function(data) {
  const expenses = data.trim().split('\n').map((expense) => parseInt(expense, 10))

  for (const factor1 of expenses) {
    for (const factor2 of expenses) {
      if (factor1 + factor2 >= EXPECTED_RESULT) {
        continue
      }

      for (const factor3 of expenses) {
        if (factor1 + factor2 + factor3 === EXPECTED_RESULT) {
          console.log([factor1, factor2, factor3, factor1 * factor2 * factor3])
          return
        }
      }
    }
  }
})
