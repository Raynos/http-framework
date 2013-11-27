var h = require("hyperscript")

module.exports = layout

function layout(title, content) {
    return "<!DOCTYPE html>" +
        h("html", [
            h("head", [
                h("title", title),
                h("link", { href: "style.css", rel: "stylesheet" })
            ]),
            h("body", content)
        ]).outerHTML
}
