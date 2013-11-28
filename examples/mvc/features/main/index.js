var redirecter = require("redirecter")

// This is our controller.
// note that our feature has it's own package.json and it's own
// features dependencies
module.exports = MainController

function MainController(config) {
    // the main feature only works if the user feature is installed
    // if it is installed then the uri where the user feature lives
    // is in the features hash.
    // this allows us to change the uris where features live on
    // our website at the top level
    var userUri = config.features.user

    return controller

    function controller(req, res) {
        redirecter(req, res, userUri)
    }
}
