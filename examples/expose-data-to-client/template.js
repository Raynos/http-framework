var h = require("hyperscript")
var JSONGlobals = require("json-globals")

module.exports = template

function template(clientData) {
    return "<DOCTYPE html>" + h("html", [
        h("head", [
            h("title", "Express"),
            // to expose state to the client
            // we create a script tag with JSONGlobals version
            // of the data. This will just expose a single
            // global variable called `__JSON_GLOBALS_`
            h("script", JSONGlobals(clientData))
        ]),
        h("body", [
            h("h1", "Expose client data"),
            h("p", "The following was exposed to the client:"),
            h("pre",
                h("script", [
                    "document.write(JSON.stringify(__JSON_GLOBALS_, null, 2))"
                ]))
        ])
    ]).outerHTML
}
