var h = require("hyperscript")

var styleContent = [
    "body {",
    "    padding: 50px;",
    "    font: 13px Helvetica, Arial, sans-serif;",
    "}",
    ".error {",
    "    color: red;",
    "}",
    ".success {",
    "    color: green;",
    "}"
].join("\n")

module.exports = template

function template(opts) {
    return layout("Authentication Example", [
        h("h1", "Login"),
        h("div", { innerHTML: opts.message }),
        "Try accessing ",
        h("a", { href: "/restricted" }, "/restricted"),
        ", then authenticate with tj and foobar",
        h("form", { method: "post", action: "/login" }, [
            h("p", [
                h("label", "Username:"),
                h("input", { type: "text", name: "username" })
            ]),
            h("p", [
                h("label", "Password:"),
                h("input", { type: "text", name: "password" })
            ]),
            h("p",
                h("input", { type: "submit", value: "Login" }))
        ])
    ])
}

function layout(title, content) {
    return "<!DOCTYPE html>" +
        h("html",
            h("head", [
                h("title", title),
                h("style", styleContent)
            ]),
            h("body", content)
        ).outerHTML
}
