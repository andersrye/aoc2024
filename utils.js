require('./dirty-tricks')
const fs = require('fs')

module.exports = {
  getInput(day) {
    const path = `./${process.env.EXAMPLE ? 'examples' : 'inputs'}/${day}.txt`
    return fs.readFileSync(path, 'utf-8')
  }
}