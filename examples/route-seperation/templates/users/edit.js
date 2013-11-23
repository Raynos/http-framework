var h = require("hyperscript")

var layout = require("../layout.js")

module.exports = edit

function edit(opts) {
    return layout(opts.title, [
        h("h1", "Editing ", opts.name),
        h("#user",
            h("form", { method: "post" }, [
                h("p", [
                    "Name: ",
                    h("input", { value: opts.name, name: "name" })
                ]),
                h("p", [
                    "Email: ",
                    h("input", { value: opts.email, name: "email" })
                ]),
                h("p", h("input", { type: "submit", value: "Save" }))
            ]))
    ])
}
