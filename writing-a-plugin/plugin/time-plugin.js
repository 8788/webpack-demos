const colors = require('colors')

class TimePlugin {
  apply (compiler) {
    compiler.hooks.beforeRun.tap('TimePlugin', () => this.startTime = Date.now())
    compiler.hooks.done.tapAsync('TimePlugin', (compilation, callback) => {
      this.endTime = Date.now()
      callback()
      console.log(`\nCompile done in: ${this.endTime - this.startTime}ms`.green)
    })
  }
}

module.exports = TimePlugin