import {getInput, printSolution, printTotalTime} from './utils.mjs'

const parsed = getInput('08').split('\n').map(r => r.split(''))
const antennas = parsed.iterateMatrix().reduce((acc, [e, p]) => {
  if (e !== '.') acc[e] = [...(acc[e] ?? []), p]
  return acc
}, {})

function combinations(arr) {
  const res = []
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      res.push([arr[i], arr[j]])
    }
  }
  return res
}

function* antinodes([y1, x1], [y2, x2], start = 0) {
  const [dy, dx] = [y1 - y2, x1 - x2]
  for (let i = start; true; i++) {
    yield [y1 + dy * i, x1 + dx * i]
  }
}

const inside = ([y, x]) => parsed[y]?.[x]
const solution1 = Object.values(antennas)
  .flatMap(combinations)
  .flatMap(([p1, p2]) => [antinodes(p1, p2, 1).first(), antinodes(p2, p1, 1).first()])
  .filter(inside)
  .toSet(p => p.join()).size
printSolution(solution1)

const solution2 = Object.values(antennas)
  .flatMap(combinations)
  .flatMap(([p1, p2]) => [...antinodes(p1, p2).takeWhile(inside), ...antinodes(p2, p1).takeWhile(inside)])
  .toSet(p => p.join()).size

printSolution(solution2)
printTotalTime()