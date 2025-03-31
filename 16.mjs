import {getInput, printSolution} from './utils.mjs'
import * as sea from "node:sea";
import {PriorityQueue} from "@datastructures-js/priority-queue";

const map = getInput('16').split('\n').map(l => l.split(''))
const map2 = structuredClone(map)
const startPos = map.firstNonFalsey((l, i) => l.firstNonFalsey((c, j) => c === 'S' && [i, j]))
const endPos = map.firstNonFalsey((l, i) => l.firstNonFalsey((c, j) => c === 'E' && [i, j]))
console.log('sta', startPos, endPos)

function estimate({pos: [y, x]}) {
  const [ey, ex] = endPos
  const dist = Math.abs(y-ey) +Math.abs(x-ex)
  return dist + ((y === ey || x === ex) ? 0 : 1000)
}

function neighbors({pos: [y, x], dir}) {
  if (dir === '^') return [{pos: [y - 1, x], dir, cost: 1}, {pos: [y, x - 1], dir: '<', cost: 1001}, {pos: [y, x + 1], dir: '>', cost: 1001}]
  if (dir === '>') return [{pos: [y, x + 1], dir, cost: 1}, {pos: [y - 1, x], dir: '^', cost: 1001}, {pos: [y + 1, x], dir: 'v', cost: 1001}]
  if (dir === 'v') return [{pos: [y + 1, x], dir, cost: 1}, {pos: [y, x + 1], dir: '>', cost: 1001}, {pos: [y, x - 1], dir: '<', cost: 1001}]
  if (dir === '<') return [{pos: [y, x - 1], dir, cost: 1}, {pos: [y + 1, x], dir: 'v', cost: 1001}, {pos: [y - 1, x], dir: '^', cost: 1001}]
}

const queue = new PriorityQueue((a1, a2) => a1.cost+a1.estimate > a2.cost+a2.estimate ? 1 : -1)
const costs = {}
const visited = new Set()
queue.push({pos: startPos, dir: '>'})

function search() {
  let i = 0
  while (!queue.isEmpty()) {
    const next = queue.dequeue()
    //console.log('val', val)
    const {pos: [y, x], dir} = next
    //console.log(y, x, dir, visited)
    const nextVal = map[y]?.[x]
    //console.log('next', y, x, dir, nextVal, score)
    if (nextVal === 'E') return [currentCost, visited]
    if(!nextVal || nextVal === '#') continue
    const key = [y, x].join()
    if (visited.has(key)) continue
    visited.add(key)
    //map2[y][x] = dir
    //console.log('-------------------------')
    //map2.printMatrix()


    for (const neighbor of neighbors(next)) {
      const {pos:[y, x], dir, cost} = neighbor
      queue.enqueue({pos:[y,x], dir})
    }
    if (i++ % 10000 === 0) {
      const front = queue.front()
      console.log(i, queue.size(), front.pos, front.estimate)
    }

  }
}

const res = search()
printSolution(res[0])
res[1].forEach(s => {
  const [y, x] = s.split(',')
  map2[y][x] = 'x'
})
map2.printMatrix()