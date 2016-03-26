var sendHtml = require("send-data/html")

var userPage = require("../../templates/users/view.js")
var loadUser = require("./load-user.js")

module.exports = userView

function userView(req, res, opts, cb) {
    loadUser(opts.params.id, function (err, user) {
        if (err) {
            return cb(err)
        }

        sendHtml(req, res, userPage({
            title: "Viewing user " + user.name,
            name: user.name,
            email: user.email
        }))
    })
}
