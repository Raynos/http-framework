var sendHtml = require("send-data/html")

var usersPage = require("../../templates/users/index.js")
var users = require("./user-db.js")

module.exports = usersRoute

function usersRoute(req, res) {
    sendHtml(req, res, usersPage({ title: "Users", users: users }))
}
