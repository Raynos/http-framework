var Router = require("routes-router/child")
var sendHtml = require("send-data/html")
var redirect = require("redirecter")
var formBody = require("body/form")
var TypedError = require("error/typed")

var UserModel = require("./model.js")
var usersPage = require("./views/list.js")
var editPage = require("./views/edit.js")
var userPage = require("./views/show.js")

var UserNotFound = TypedError({
    message: "User %s not found",
    type: "user.not.found",
    statusCode: 404
})

// This is our UserController
module.exports = UserController

function UserController(config) {
    // to enable using sub routes in our controller we create
    // a new router. This router is a ChildRouter and will delegate
    // all error and 404 handler to it's parent. i.e. the global
    // application
    var controller = Router()
    // We instantiate our model here with the database configuration
    // the model is local to this user feature
    var model = UserModel(config.db)
    // we set up configuration to pass to our views.
    var viewsConfig = { layout: config.layout }

    controller.addRoute("/", function (req, res, opts, cb) {
        model.getAll(function (err, users) {
            if (err) {
                return cb(err)
            }

            sendHtml(req, res, usersPage(users, viewsConfig))
        })
    })

    controller.addRoute("/:id/edit", function (req, res, opts, cb) {
        model.get(opts.id, function (err, user) {
            if (err) {
                return cb(err)
            }

            if (!user) {
                return cb(UserNotFound(opts.id))
            }

            sendHtml(req, res, editPage(user, viewsConfig))
        })
    })

    controller.addRoute("/:id", {
        GET: function (req, res, opts, cb) {
            model.get(opts.id, function (err, user) {
                if (err) {
                    return cb(err)
                }

                if (!user) {
                    return cb(UserNotFound(opts.id))
                }

                sendHtml(req, res, userPage(user, viewsConfig))
            })
        },
        POST: function (req, res, opts, cb) {
            formBody(req, res, function (err, body) {
                if (err) {
                    return cb(err)
                }

                model.setName(opts.id, body.name, function (err, user) {
                    if (err) {
                        return cb(err)
                    }

                    // setMessage('Information updated!')
                    redirect(req, res, config.uri + "/" + opts.id)
                })
            })
        }
    })

    return controller
}
