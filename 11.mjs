import {getInput, printSolution, printTotalTime, memoize} from './utils.mjs'

const stones = getInput('11').split(' ').map(n => parseInt(n))

const count = memoize(function (stone, blinks) {
  const digits = Math.floor(Math.log10(stone) + 1)
  if (blinks === 0) return 1
  if (stone === 0) {
    return count(1, blinks - 1)
  } else if (digits % 2 === 0) {
    const most = Math.floor(stone / 10 ** (digits / 2))
    const least = Math.floor(stone - most * 10 ** (digits / 2))
    return count(most, blinks - 1) + count(least, blinks - 1)
  } else {
    return count(stone * 2024, blinks - 1)
  }
})

printSolution(stones.map(stone => count(stone, 25)).sum())
printSolution(stones.map(stone => count(stone, 75)).sum())
printTotalTime()