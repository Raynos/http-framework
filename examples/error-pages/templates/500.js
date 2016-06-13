var h = require("hyperscript")

// note that we extend a different layout with 4xx and 5xx
// responses by requiring the `error` default instead
var error = require("./error.js")

module.exports = fivehundred

function fivehundred(err, opts) {
    return error([
        h("h1", "Error: " + err.message),
        opts.verbose ?
            h("pre", err.stack) :
            h("p", "An error occurred!")
    ])
}
