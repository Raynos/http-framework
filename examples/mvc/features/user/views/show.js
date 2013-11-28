var h = require("hyperscript")

module.exports = show

function show(user, opts) {
    return opts.layout("User page", [
        h("h1", [
            user.name + " ",
            h("a", {
                href: opts.urlMap.userEdit({ userId: user.id })
            }, "edit")
        ]),
        // handle messaging somehow
        user.pets.length ? [
            h("p", "View " + user.name + "s pets:"),
            h("ul", user.pets.map(function (pet) {
                return h("li", [
                    h("a", {
                        href: opts.urlMap.pet({ petId: pet.id })
                    }, pet.name)
                ])
            }))
        ] : h("p", "No pets!")
    ])
}
