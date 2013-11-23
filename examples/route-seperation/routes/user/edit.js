var sendHtml = require("send-data/html")
var formBody = require("body/form")
var redirecter = require("redirecter")

var userPage = require("../../templates/users/edit.js")
var loadUser = require("./load-user.js")
var users = require("./user-db.js")

module.exports = {
    GET: renderPage,
    POST: updateUser
}

function renderPage(req, res, opts, callback) {
    loadUser(opts.id, function (err, user) {
        if (err) {
            return callback(err)
        }

        sendHtml(req, res, userPage({
            title: "Editing user " + user.name,
            name: user.name,
            email: user.email
        }))
    })
}

// normally you would handle validation logic and asynchronously
// save back to the database
function updateUser(req, res, opts, callback) {
    var userId = opts.id
    formBody(req, res, function (err, body) {
        if (err) {
            return callback(err)
        }

        users[userId] = body

        redirecter(req, res, "/users/" + userId + "/edit")
    })
}
