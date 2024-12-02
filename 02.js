const {getInput} = require('./utils')

const parsedInput = getInput('02').split('\n')
  .map(s => s.split(/\s+/).map(n => parseInt(n)))

function isSafe(array) {
  let increasing = null
  for (let i = 0; i < array.length - 1; i++) {
    const a = array[i], b = array[i + 1]
    const diff = Math.abs(a - b)
    if (diff < 1 || diff > 3) return false
    if (a > b && increasing !== false) {
      increasing = true
    } else if (a < b && increasing !== true) {
      increasing = false
    } else {
      return false
    }
  }
  return true
}

const {true: safe, false: unsafe} = parsedInput.groupBy(isSafe)

console.log('solution 1', safe.length)

function isAlsoSafe(array) {
  return array.map((_, i, arr) => arr.toSpliced(i, 1)).some(isSafe)
}

const alsoSafe = unsafe.filter(isAlsoSafe)

console.log('solution 2', safe.length + alsoSafe.length)