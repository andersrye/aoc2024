import {getInput, printSolution, printTotalTime} from './utils.mjs'

const [orderings, updates] = getInput('05').split('\n\n').map(p => p.split('\n'))
const parsedOrderings = orderings.map(o => o.split('|'))
const parsedUpdates = updates.map(u => u.split(','))
const afterMap = parsedOrderings.reduce((acc, [a, b]) => (acc[a] = [...(acc[a] ?? []), b], acc), {})
const beforeMap = parsedOrderings.reduce((acc, [a, b]) => (acc[b] = [...(acc[b] ?? []), a], acc), {})

function isValid(arr) {
  const next = new Set(arr)
  const prev = new Set()
  return arr.every(page => {
    next.delete(page)
    const valid = afterMap[page]?.every(p => !prev.has(p)) !== false
      && beforeMap[page]?.every(p => !next.has(p)) !== false
    prev.add(page)
    return valid
  })
}

const solution1 = parsedUpdates.filter(isValid).map(a => parseInt(a[Math.floor(a.length / 2)])).sum()
printSolution(solution1)

const solution2 = parsedUpdates.filter(a => !isValid(a)).map(arr => {
  return arr.sort((a, b) => {
    if (afterMap[a]?.includes(b)) return -1
    if (afterMap[b]?.includes(a)) return 1
    if (beforeMap[a]?.includes(b)) return 1
    if (beforeMap[b]?.includes(a)) return -1
  })
}).map(a => parseInt(a[Math.floor(a.length / 2)])).sum()
printSolution(solution2)
printTotalTime()
