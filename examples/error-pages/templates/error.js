var h = require("hyperscript")

module.exports = error

function error(content) {
    return "<!DOCTYPE html>" + h("html", [
        h("head",
            h("title", "Error")),
        h("body", [
            h("h1", "An error occured!"),
            content
        ])
    ]).outerHTML
}
