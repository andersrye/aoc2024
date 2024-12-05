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
  }
}

Object.assign(Array.prototype, arrayUtils)