import {getInput, printSolution, printTotalTime} from './utils.mjs'

const input = getInput('09').split('')
const disk = input.flatMap((c, i) => {
  return Array(parseInt(c)).fill(i % 2 === 0 ? i / 2 : undefined)
})

let j = 0
for (let i = disk.length - 1; i >= 0; i--) {
  const a = disk[i]
  if (a === undefined) continue
  while (j++ < i) {
    const b = disk[j]
    if (b !== undefined) continue
    disk[i] = b
    disk[j] = a
    break
  }
}

const solution1 = disk.reduce((acc, n, i) => n !== undefined ? acc + n * i : acc, 0)
printSolution(solution1)

const disk2 = input.map((n, i) => ({val: i % 2 === 0 ? i / 2 : undefined, length: parseInt(n)}))

for (let i = disk2.length - 1; i >= 0; i--) {
  const a = disk2[i]
  if (a.val === undefined) continue
  for (let j = 0; j < i; j++) {
    const b = disk2[j]
    if (b.val !== undefined || a.length > b.length) continue
    disk2[i] = {val: undefined, length: a.length}
    if (a.length < b.length) {
      disk2.splice(j, 1, a, {val: undefined, length: b.length - a.length})
    } else {
      disk2[j] = a
    }
    break
  }
}
const solution2 = disk2.flatMap(({val, length}) => new Array(length).fill(val))
  .reduce((acc, n, i) => n !== undefined ? acc + n * i : acc, 0)

printSolution(solution2)