var h = require("hyperscript")

var layout = require("./layout.js")

module.exports = home

function home(opts) {
    return layout(opts.title,
        h("ul", [
            h("li", [
                "Visit the ",
                h("a", { href: "/users" }, "users"),
                " page"
            ]),
            h("li", [
                "Visit the ",
                h("a", { href: "/posts" }, "posts"),
                " page"
            ])
        ]))
}
