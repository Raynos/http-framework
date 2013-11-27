var h = require("hyperscript")

var layout = require("./layout.js")

module.exports = errorPage

function errorPage(err) {
    return layout("Internal Server Error", [
        h("h1", "500: Internal Server Error"),
        h("p", "Looks like something blew up!")
    ])
}
