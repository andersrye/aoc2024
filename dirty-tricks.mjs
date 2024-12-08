const arrayUtils = {
  zip(other) {
    return this.reduce((acc, val, i) => [...acc, [val, other[i]]], [])
  },
  unzip() {
    return this.reduce(([listA, listB], [a, b]) => [[...listA, a], [...listB, b]], [[], []])
  },
  groupBy(fn) {
    return Object.groupBy(this, fn)
  },
  freq(keyFn = (el) => el) {
    return this.reduce((acc, val) => (acc[keyFn(val)] = (acc[keyFn(val)] ?? 0) + 1, acc), {})
  },
  sum() {
    return this.reduce((acc, val) => acc + val)
  },
  product() {
    return this.reduce((acc, val) => acc * val)
  },
  firstNonFalsey(pred) {
    for (let i = 0; i < this.length; i++) {
      const res = pred(this[i], i, this)
      if (res) return res
    }
  },
  toSet(mapFn) {
    return new Set(mapFn ? this.map(mapFn) : this)
  },
  * iterateMatrix() {
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this[0].length; j++) {
        yield [this[i][j], [i, j]]
      }
    }
  },
  printMatrix() {
    console.log(this.map(r => r.join('')).join('\n'))
  }
}

const generatorUtils = {
  * map(fn) {
    for (const val of this) {
      yield fn(val)
    }
  },
  forEach(fn) {
    let i = 0
    for (const val of this) {
      fn(val, i)
    }
  },
  *takeWhile(pred) {
    for (const val of this) {
      if(pred(val)) {
        yield val
      } else break
    }
  },
  reduce(fn, acc) {
    let i = 0
    for (const val of this) {
      acc = fn(acc, val, i++)
    }
    return acc
  },
  toArray(mapFn) {
    return Array.from(this, mapFn)
  },
  toSet(mapFn) {
    return new Set(mapFn ? this.map(mapFn) : this)
  },
  first() {
    return this.next().value
  }
}

const setUtils = {
  toArray(mapFn) {
    return Array.from(this, mapFn);
  }
}

Object.assign(Array.prototype, arrayUtils)
Object.assign(Set.prototype, setUtils)
Object.assign(Object.getPrototypeOf(function* () {}).prototype, generatorUtils)

