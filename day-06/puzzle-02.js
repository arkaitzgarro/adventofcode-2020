const path = require('path')

const { readFile } = require('../common/file-utils')

readFile(path.resolve('day-06/input.txt')).then(function(data) {
  const groups = readGroups(data)

  console.log(groups.reduce((sum, group) => {
    sum += afirmativeAnswers(group)
    return sum
  }, 1))
})

function afirmativeAnswers(group) {
  return group.reduce((common, person) => intersect(common, person), group[0]).length
}

function intersect(a, b) {
  const setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}

function readGroups(data) {
  return data.split(/\n\n/).map((group) => group.split('\n'))
}
