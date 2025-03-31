import {getInput, printSolution} from './utils.mjs'

const input = getInput('15').split('\n\n')
const map = input[0].split('\n').map(l => l.split(''))
const movements = input[1].replaceAll(/\s+/g, '').split('')
const dirs = {
  '<': [0, -1],
  '^': [-1, 0],
  '>': [0, 1],
  'v': [1, 0],
}

function move([y, x], pos, [dy, dx]) {
  for (let dist = 1; ; dist++) {
    const [ny, nx] = [y + dist * dy, x + dist * dx]
    const next = map[ny][nx]
    if (next === '.') {
      if (dist > 1) {
        map[y + dy][x + dx] = '.'
        map[ny][nx] = 'O'
      }
      return [y + dy, x + dx]
    } else if (next === '#') {
      return [y, x]
    }
  }
}

let pos = map.firstNonFalsey((l, i) => l.firstNonFalsey((c, j) => c === '@' && [i, j]))
map[pos[0]][pos[1]] = '.'
movements.forEach(dir => {
  pos = move(pos, map, dirs[dir])
})
const solution = map.iterateMatrix().map(([v, [y, x]]) => v === 'O' ? 100 * y + x : 0).sum()
printSolution(solution)
//part 2

const map2 = input[0].split('\n').map(l => l.split('')).map(l => l.flatMap(c => {
  if(c === '.') return ['.','.']
  else if(c === '#') return ['#','#']
  else if(c === 'O') return ['[',']']
  else if(c === '@') return ['@','.']
}))
map2.printMatrix()