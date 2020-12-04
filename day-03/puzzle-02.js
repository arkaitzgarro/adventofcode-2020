const path = require('path')

const { readFile } = require('../common/file-utils')

readFile(path.resolve('day-03/input.txt')).then(function(data) {
  const pattern = data.trim().split('\n').map((row) => row.split(''))

  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ]

  console.log(slopes.reduce((total, slope) => total * countTrees(pattern, slope), 1))
})

function countTrees(pattern, slope) {
  let trees = 0
  let map = [...pattern]
  let position = { row: 0, column: 0 }
  const locations = []

  while(true) {
    position = move(position, slope)
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

  return trees
}

function move(position, slope) {
  return {
    row: position.row + slope.down,
    column: position.column + slope.right
  }
}

function extendMap(map, pattern) {
  return map.map((row, index) => row.concat(pattern[index]))
}
