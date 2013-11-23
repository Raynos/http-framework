var h = require("hyperscript")

var layout = require("../layout.js")

module.exports = show

function show(opts) {
    return layout(opts.title, [
        h("h1", "Users"),
        h("#users", opts.users.map(function (user, index) {
            return h("li", [
                h("a", { href: "/users/" + index }, user.name),
                h("a.edit", { href: "/users/" + index + "/edit" }, "edit")
            ])
        }))
    ])
}
