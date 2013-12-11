var h = require("hyperscript")

module.exports = template

function template(opts) {
    return "<DOCTYPE html>" + h("html", [
        h("head",
            h("title", "CSRF demo")),
        h("body", [
            h("form", { action: "/", method: "post" }, [
                h("input", {
                    type: "hidden",
                    name: "x-csrf-token",
                    value: opts.token
                }),
                h("input", {
                    type: "text",
                    name: "name",
                    value: opts.name,
                    placeholder: "Username"
                }),
                h("input", { type: "submit", value: "Login" })
            ])
        ])
    ]).outerHTML
}
