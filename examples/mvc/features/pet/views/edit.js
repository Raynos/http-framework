var h = require("hyperscript")

module.exports = edit

function edit(pet, opts) {
    return opts.layout("Edit Pet", [
        h("h1", pet.name),
        h("form", {
            action: opts.urlMap.pet({ petId: pet.id }),
            method: "post"
        }, [
            h("label", [
                "Name: ",
                h("input", { name: "name", value: pet.name })
            ]),
            h("input", { type: "submit", value: "Update" })
        ])
    ])
}
