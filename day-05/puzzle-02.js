const path = require('path')

const { readFile } = require('../common/file-utils')

readFile(path.resolve('day-05/input.txt')).then(function(data) {
  const passes = data.trim().split('\n')

  const seatIds = passes.map(calculateSeatId).sort((a, b) => a - b)
  for (let i = 0; i < seatIds.length - 1; i++) {
    if (seatIds[i + 1] - seatIds[i] !== 1) {
      console.log(seatIds[i] + 1)
    }
  }
})

function calculateSeatId(boardingPass) {
  const row = calculatePosition(boardingPass.substring(0, 7), 0, 127)
  const column = calculatePosition(boardingPass.substring(7), 0, 7)

  return row * 8 + column
}

function calculatePosition(boardingPass, min = 0, max = 127) {
  const action = boardingPass[0]

  if (boardingPass.length === 1) {
    return ['F', 'L'].includes(action) ? min : max
  }

  if (['F', 'L'].includes(action)) {
    const middleRow = Math.floor((max - min) / 2)
    return calculatePosition(boardingPass.substring(1), min, min + middleRow)
  }

  if (['B', 'R'].includes(action)) {
    const middleRow = Math.ceil((max - min) / 2)
    return calculatePosition(boardingPass.substring(1), min + middleRow, max)
  }
}
