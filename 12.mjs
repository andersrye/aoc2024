import {getInput, printSolution, printTotalTime, memoize} from './utils.mjs'

const map = getInput('12').split('\n').map(r => r.split(''))

const neighbors = ([y, x]) => [[y + 1, x], [y, x + 1], [y - 1, x], [y, x - 1]]
const diagonals = ([y, x]) => [[y + 1, x + 1], [y - 1, x + 1], [y - 1, x - 1], [y + 1, x - 1]]

const visited = new Set()

function region(pos) {
  const region = map[pos[0]][pos[1]]
  const stack = [pos]
  let perimeter = 0
  let area = 0
  let numCorners = 0
  while (stack.length > 0) {
    const plot = stack.pop()
    const plotVal = map[plot[0]]?.[plot[1]]
    const k = plot.join()
    if (plotVal === undefined || visited.has(k)) continue
    area++
    visited.add(k)
    const dirs = neighbors(plot)
    const [d, r, u, l] = dirs
    for (const [y, x] of dirs) {
      if (map[y]?.[x] === plotVal) {
        stack.push([y, x])
      } else {
        perimeter++
      }
    }
    const [dr, ur, ul, dl] = diagonals(plot)
    const corners = [[u, ur, r], [r, dr, d], [d, dl, l], [l, ul, u]]
    for (const corner of corners) {
      const [a, b, c] = corner.map(([y, x]) => map[y]?.[x])
      if (region === a && region === c && region !== b || region !== a && region !== c) {
        numCorners++
      }
    }
  }
  return [perimeter, area, numCorners, region]
}

const regions = map.iterateMatrix()
  .map(([, plotPos]) => visited.has(plotPos.join()) ? null : region(plotPos))
  .filter(e => !!e)
  .toArray()

printSolution(regions.map(([p, a]) => p * a).sum())
printSolution(regions.map(([, a, s]) => s * a).sum())
printTotalTime()
