import './dirty-tricks.mjs'
import fs from 'fs'

export function getInput(day) {
  const path = `./${process.env.EXAMPLE ? 'examples' : 'inputs'}/${day}.txt`
  return fs.readFileSync(path, 'utf-8')
}

export function memoize(fn) {
  const cache = {}
  return function (...args) {
    const k = args.toString()
    return cache[k] ?? (cache[k] = fn(...args))
  }
}

export function resetTimer() {
  timer = performance.now()
}

let solutionCounter = 0
let totalTime = 0
export function printSolution(solution) {
  const time = performance.now() - timer
  totalTime += time
  console.log('Solution', ++solutionCounter, '=', solution, 'in', time.toFixed(2), 'ms')
  resetTimer()
}

export function printTotalTime() {
  const time = performance.now() - startTime
  console.log(`Total time: ${totalTime.toFixed(2)}ms (${time.toFixed(2)}ms)`)
}

export class PriorityQueue {
  #vals = []

  push(val, priority) {
    const index = this.#vals.findIndex(([_, p]) => priority > p)
    if(index === -1) {
      this.#vals.push([val, priority])
    } else {
      this.#vals.splice(index, 0, [val, priority])
    }
  }

  pop() {
    return this.#vals.pop()
  }
  get length() {
    return this.#vals.length
  }
}


const startTime = performance.now()
let timer = startTime
