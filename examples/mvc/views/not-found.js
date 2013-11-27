var h = require("hyperscript")

var layout = require("./layout.js")

module.exports = notFound

function notFound(url) {
    return layout("Not Found", [
        h("h1", "404: Not Found"),
        h("p", "Sorry we can't find " + url)
    ])
}
