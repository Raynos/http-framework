var h = require("hyperscript")

module.exports = layout

function layout(content) {
    return "<!DOCTYPE html>" + h("html", [
        h("head",
            h("title", "Custom Pages Example")),
        h("body", [
            h("h1", "My Site"),
            content
        ])
    ]).outerHTML
}
