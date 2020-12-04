const path = require('path')

const { readFile } = require('../common/file-utils')

readFile(path.resolve('day-03/input.txt')).then(function(data) {
  const pattern = data.trim().split('\n').map((row) => row.split(''))

  let trees = 0
  let map = [...pattern]
  let position = { row: 0, column: 0 }
  const locations = []

  while(true) {
    position = move(position)
    if (position.row >= pattern.length) {
      // We reached the bottom of the map
      break
    }

    if (position.column >= map[position.row].length) {
      // Grow the map based on arboreal genetics and biome stability
      map = extendMap(map, pattern)
    }

    trees += map[position.row][position.column] === '#' ? 1 : 0
  }

  console.log(trees)
})

function move(position) {
  return {
    row: position.row + 1,
    column: position.column + 3
  }
}

function extendMap(map, pattern) {
  return map.map((row, index) => row.concat(pattern[index]))
}
