import {getInput, printSolution, printTotalTime} from './utils.mjs'

const map = getInput('06').split('\n').map(l => l.split(''))
let startPos = map.firstNonFalsey((l, i) => l.firstNonFalsey((c, j) => c === '^' && [i, j]))

const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

function* path([y, x], map, dir = 0) {
  let [dy, dx] = dirs[dir]
  yield [[y, x], dir]
  while (true) {
    const [ny, nx] = [y + dy, x + dx]
    const next = map[ny]?.[nx]
    if (!next) break
    if (next === '#') {
      dir = (dir + 1) % 4;
      [dy, dx] = dirs[dir]
      continue
    }
    [y, x] = [ny, nx]
    yield [[y, x], dir]
  }
}

const walkedPath = path(startPos, map).toSet(([p]) => p.toString())
printSolution(walkedPath.size)

const obstacleLocations = walkedPath.toArray(p => p.split(',').map(n => parseInt(n))).slice(1)
let count = 0

for (const [y, x] of obstacleLocations) {
  map[y][x] = '#'
  const visited = new Set()
  for (const [pos, dir] of path(startPos, map)) {
    const k = `${pos.join()},${dir}`
    if (visited.has(k)) {
      count++
      break
    }
    visited.add(k)
  }
  map[y][x] = '.'
}

printSolution(count)
printTotalTime()
