const path = require('path')

const { readFile } = require('../common/file-utils')

readFile(path.resolve('day-06/input.txt')).then(function(data) {
  const groups = readGroups(data)

  console.log(groups.reduce((sum, group) => {
    sum += countAnswers(group)
    return sum
  }, 0))
})

function countAnswers(group) {
  return [...new Set(group.join(''))].length
}

function readGroups(data) {
  return data.split(/\n\n/).map((group) => group.split('\n'))
}
