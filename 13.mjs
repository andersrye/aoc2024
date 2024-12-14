import {getInput, printSolution, printTotalTime, memoize} from './utils.mjs'

const input = getInput('13').split('\n\n').map(s =>
  s.match(/X\+(\d+).+Y\+(\d+).+X\+(\d+).+Y\+(\d+).+X=(\d+).+Y=(\d+)/s)
    .slice(1)
    .map(n => parseInt(n))
)

function buttonPresses([ax, ay, bx, by, tx, ty]) {
  const b = (ty * ax - tx * ay) / (by * ax - bx * ay)
  const a = (tx - b * bx) / ax
  if (Number.isInteger(a) && Number.isInteger(b)) return [a, b]
}

function tokens(input) {
  return input.map(buttonPresses).filter(n => !!n).map(([a, b]) => 3 * a + b).sum()
}

printSolution(tokens(input))

const input2 = input.map(([ax, ay, bx, by, tx, ty]) => [ax, ay, bx, by, tx + 10000000000000, ty + 10000000000000])
printSolution(tokens(input2))