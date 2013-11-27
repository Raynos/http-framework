var redirecter = require("redirecter")

// This is our controller.
// note that our feature has it's own package.json and it's own
// features dependencies
module.exports = MainController

function MainController(config) {
    return controller

    function controller(req, res) {
        redirecter(req, res, "/users")
    }
}
