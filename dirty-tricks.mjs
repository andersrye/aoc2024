const arrayUtils = {
  zip(other) {
    return this.reduce((acc, el, i) => [...acc, [el, other[i]]], [])
  },
  unzip() {
    return this.reduce(([listA, listB], [a, b]) => [[...listA, a], [...listB, b]], [[], []])
  },
  groupBy(fn) {
    return Object.groupBy(this, fn)
  },
  freq(keyFn = (el) => el) {
    return this.reduce((acc, el) => (acc[keyFn(el)] = (acc[keyFn(el)] ?? 0) + 1, acc), {})
  },
  sum() {
    return this.reduce((acc, el) => acc + el)
  },
  product() {
    return this.reduce((acc, el) => acc * el)
  },
  firstNonFalsey(pred) {
    for (let i = 0; i < this.length; i++) {
      const res = pred(this[i], i, this)
      if (res) return res
    }
  },
  toSet(mapFn) {
    return new Set(mapFn ? this.map(mapFn) : this)
  }
}

const generatorUtils = {
  * map(fn) {
    for (const val of this) {
      yield fn(val)
    }
  },
  toArray(mapFn) {
    return Array.from(this, mapFn)
  },
  toSet(mapFn) {
    return new Set(mapFn ? this.map(mapFn) : this)
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

