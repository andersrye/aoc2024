const {getInput} = require('./utils')

const parsedInput = getInput('03').split('\n').flatMap(line => {
  const res = []
  line.matchAll(/mul\((\d+),(\d+)\)/g).forEach(m => {
    res[m.index] = m.slice(1, 3).map(n => parseInt(n)).product()
  })
  line.matchAll(/(do\(\)|don't\(\))/g).forEach(m => {
    res[m.index] = m[0] === 'do()'
  })
  return res
})

const solution1 = parsedInput.reduce((acc, el) => typeof el === 'number' ? acc + el : acc)
console.log('solution 1', solution1)

const solution2 = parsedInput.reduce(([enabled, sum], el) => {
  if (typeof el === 'boolean') return [el, sum]
  if (!enabled) return [enabled, sum]
  if (typeof el === 'number') return [enabled, sum + el]
}, [true, 0])
console.log('solution 2', solution2[1])
