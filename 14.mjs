import {getInput, printSolution} from './utils.mjs'

const [mx, my] = [101, 103] //[11, 7]

const robots = getInput('14').split('\n')
  .map(l => l.match(/p=(\d+),(\d+)\s+v=(-?\d+),(-?\d+)/).slice(1).map(n => parseInt(n)))

function move([x, y], [dx, dy], times) {
  return [((x + mx + dx * times) % mx + mx) % mx, ((y + dy * times) % my + my) % my]
}

const groups = robots.map(([x, y, dx, dy]) => move([x, y], [dx, dy], 100))
  .filter(([x, y]) => x !== Math.floor(mx / 2) && y !== Math.floor(my / 2))
  .groupBy(([x, y]) => [Math.floor(x / (mx / 2)), Math.floor(y / (my / 2))])

printSolution(Object.values(groups).map(v => v.length).product())

function printToString(robots) {
  const matrix = new Array(my).fill(null).map(_ => new Array(mx).fill(' '))
  robots.forEach(([x, y]) => {
    matrix[y][x] = '#'
  })
  return matrix.map(r => r.join('')).join('\n')
}

for (let i = 70; i < 10000; i += 103) {
  const moved = robots.map(([x, y, dx, dy]) => move([x, y], [dx, dy], i))
  const string = printToString(moved)
  if (string.includes('############')) { //i only know this because i scrolled through until i saw it first
    printSolution(i)
    //console.log(string)
  }
}
