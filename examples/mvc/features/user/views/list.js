var h = require("hyperscript")

module.exports = list

function list(users, opts) {
    return opts.layout("Users list", [
        h("h1", "Users"),
        h("p", "Click a user below to view their pets."),
        h("ul", users.map(function (user) {
            return h("li", [
                h("a", {
                    href: opts.urlMap.user({ userId: user.id })
                }, user.name)
            ])
        }))
    ])
}
