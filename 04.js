const {getInput} = require('./utils')

const parsedInput = getInput('04').split('\n').map(r => r.split(''))
const XMAS = 'XMAS'

function* xmas(y, x) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      for (let k = 0; k <= 3; k++) {
        if (parsedInput[y + k * i]?.[x + k * j] !== XMAS[k]) break
        if (k === 3) yield true
      }
    }
  }
}

let count = 0
for (let i = 0; i < parsedInput.length; i++) {
  for (let j = 0; j < parsedInput[0].length; j++) {
    for (const c of xmas(i, j)) {
      count++
    }
  }
}

console.log('solution 1', count)

let count2 = 0
for (let i = 0; i < parsedInput.length; i++) {
  for (let j = 0; j < parsedInput[0].length; j++) {
    const p = parsedInput
    if (p[i]?.[j] === 'A') {
      if (
        p[i - 1]?.[j - 1] === 'M' && p[i + 1]?.[j + 1] === 'S' && p[i - 1]?.[j + 1] === 'M' && p[i + 1]?.[j - 1] === 'S'
        || p[i - 1]?.[j - 1] === 'S' && p[i + 1]?.[j + 1] === 'M' && p[i - 1]?.[j + 1] === 'M' && p[i + 1]?.[j - 1] === 'S'
        || p[i - 1]?.[j - 1] === 'M' && p[i + 1]?.[j + 1] === 'S' && p[i - 1]?.[j + 1] === 'S' && p[i + 1]?.[j - 1] === 'M'
        || p[i - 1]?.[j - 1] === 'S' && p[i + 1]?.[j + 1] === 'M' && p[i - 1]?.[j + 1] === 'S' && p[i + 1]?.[j - 1] === 'M'
      ) count2++
    }
  }
}

console.log('solution 2', count2)