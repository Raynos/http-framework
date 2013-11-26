var h = require("hyperscript")

var layout = require("./layout.js")

module.exports = home

function home() {
    return layout([
        h("h2", "Pages Example"),
        h("ul", [
            visitLink({ href: "/500", text: "500" }),
            visitLink({ href: "/404", text: "404" }),
            visitLink({ href: "/403", text: "403" })
        ])
    ])
}

function visitLink(opts) {
    return h("li", [
        "visit ",
        h("a", { href: opts.href }, opts.text)
    ])
}
