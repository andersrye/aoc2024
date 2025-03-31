import {getInput, printSolution} from './utils.mjs'

const parsedInput = getInput('01').split('\n')
  .map(s => s.match(/(\d+)\s+(\d+)/).slice(1, 3).map(n => parseInt(n)))

const [listA, listB] = parsedInput.unzip()

const solution1 = listA.toSorted().zip(listB.toSorted()).map(([a, b]) => Math.abs(a - b)).sum()

printSolution(solution1)

const freqs = listB.freq()
const solution2 = listA.map(n => n * (freqs[n] ?? 0)).sum()
printSolution(solution2)asdasd