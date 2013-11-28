var h = require("hyperscript")

module.exports = show

function show(pet, opts) {
    return opts.layout("Pet page", [
        h("h1", [
            pet.name,
            h("a", {
                href: opts.urlMap.petEdit({ petId: pet.id })
            }, " edit")
        ]),
        h("p", "You are viewing " + pet.name)
    ])
}
