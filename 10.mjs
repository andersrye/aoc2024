import {getInput, printSolution, printTotalTime} from './utils.mjs'

const map = getInput('10').split('\n').map(l => l.split('').map(n => parseInt(n)))

function* trails([y, x], path = []) {
  const currentVal = map[y]?.[x]
  const prev = path[path.length - 1]
  const prevVal = prev && map[prev[0]]?.[prev[1]]
  if (currentVal === 9 && prevVal === 8) {
    yield [...path, [y, x]]
    return
  }
  if (currentVal !== undefined && (path.length === 0 || currentVal - prevVal === 1)) {
    const newPath = [...path, [y, x]]
    yield* trails([y + 1, x], newPath)
    yield* trails([y - 1, x], newPath)
    yield* trails([y, x + 1], newPath)
    yield* trails([y, x - 1], newPath)
  }
}

const allTrails = map.iterateMatrix().filter(([v]) => v === 0).map(([, pos]) => trails(pos).toArray()).toArray()
printSolution(allTrails.map(trails => trails.map(ps => ps[ps.length - 1]).toSet(p => p.join()).size).sum())
printSolution(allTrails.map(trails => trails.toSet(ps => ps.join()).size).sum())
printTotalTime()