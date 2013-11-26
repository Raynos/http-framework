var h = require("hyperscript")

var error = require("./error.js")

module.exports = fourofour

function fourofour(url) {
    return error(h("h2", "Cannot find " + url))
}
