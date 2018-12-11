const marked = require('marked')
const loaderUtils = require('loader-utils')

module.exports = function (src) {
  const options = loaderUtils.getOptions(this)

  this.cacheable()

  marked.setOptions(options)

  return marked(src)
}