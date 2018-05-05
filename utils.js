const utils = require('util')

module.exports = m => console.log(utils.inspect(m, {showHidden: false, depth: null}))
