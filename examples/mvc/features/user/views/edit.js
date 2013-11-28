var h = require("hyperscript")

module.exports = edit

function edit(user, options) {
    return options.layout("Edit User", [
        h("h1", user.name),
        h("form", {
            action: options.urlMap.user({ userId: user.id }),
            method: "post"
        }, [
            h("label", [
                "Name: ",
                h("input", { type: "text", name: "name", value: user.name })
            ]),
            h("input", { type: "submit", value: "Update" })
        ]),
        h("form", {
            action: options.urlMap.userPet({ userId: user.id }),
            method: "post"
        }, [
            h("label", [
                "Pet: ",
                h("input", { type: "text", name: "name", placeholder: "name" })
            ]),
            h("input", { type: "submit", value: "Add" })
        ])
    ])
}
