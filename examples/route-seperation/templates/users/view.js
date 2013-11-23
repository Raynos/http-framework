var h = require("hyperscript")

var layout = require("../layout.js")

module.exports = view

function view(opts) {
    return layout(opts.title, [
        h("h1", opts.name),
        h("#user",
            h("p", "Email: ", opts.email))
    ])
}
