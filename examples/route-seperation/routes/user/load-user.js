var TypedError = require("error/typed")
var process = require("process")

var users = require("./user-db.js")

var NOT_FOUND = TypedError({
    statusCode: 404,
    message: "Cannot find user %s"
})

module.exports = loadUser

function loadUser(id, callback) {
    var user = users[id]

    process.nextTick(function () {
        if (user) {
            return callback(null, user)
        }

        callback(NOT_FOUND(id))
    })
}
