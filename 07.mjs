import {getInput, printSolution, printTotalTime} from './utils.mjs'

const parsedInput = getInput('07').split('\n').map(l => l.split(':')).map(([t, o]) => {
  return [parseInt(t), o.trim().split(' ').map(n => parseInt(n))]
})

function* solutions(target, operands, conc = false, operator = null, sum = operands[0]) {
  const operand = operands[0]
  const nextOperands = operands.slice(1)
  if (operator === 'add') {
    sum += operand
  } else if (operator === 'mult') {
    sum *= operand
  } else if (operator === 'conc') {
    sum = sum * 10 ** Math.floor(Math.log10(operand) + 1) + operand //parseInt('' + sum + operand)
  }
  if (nextOperands.length === 0 && sum === target) yield sum
  if (nextOperands.length > 0 && sum <= target) {
    yield* solutions(target, nextOperands, conc, 'add', sum)
    yield* solutions(target, nextOperands, conc, 'mult', sum)
    if (conc) yield* solutions(target, nextOperands, conc, 'conc', sum)
  }
}

const solution1 = parsedInput.map(([target, operands]) => solutions(target, operands).first() ?? 0).sum()
printSolution(solution1)

const solution2 = parsedInput.map(([target, operands]) => solutions(target, operands, true).first() ?? 0).sum()
printSolution(solution2)
printTotalTime()