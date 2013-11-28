var Router = require("routes-router/child")
var sendHtml = require("send-data/html")
var redirect = require("redirecter")
var formBody = require("body/form")
var TypedError = require("error/typed")
var format = require("string-template")

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

    // the prefix uri for this feature (the user feature) is stored
    // on the features hash in config
    // we could also check for other features like the pet feature
    // and throw an error if the pet feature is not installed
    var prefix = config.features.user

    // we set up configuration to pass to our views.
    // we also set up an urlMap so that views are not hard coded
    // to specific paths
    var viewsConfig = { layout: config.layout, urlMap: {
        "user": format.bind(null, prefix + "/{userId}"),
        "userEdit": format.bind(null, prefix + "/{userId}/edit"),
        "userPet": format.bind(null, prefix + "/{userId}/pet"),
        "pet": format.bind(null, config.features.pet + "/{petId}")
    } }

    controller.addRoute("/", function (req, res, opts, cb) {
        model.getAll(function (err, users) {
            if (err) {
                return cb(err)
            }

            sendHtml(req, res, usersPage(users, viewsConfig))
        })
    })

    controller.addRoute("/:userId/edit", function (req, res, opts, cb) {
        model.get(opts.userId, function (err, user) {
            if (err) {
                return cb(err)
            }

            if (!user) {
                return cb(UserNotFound(opts.userId))
            }

            sendHtml(req, res, editPage(user, viewsConfig))
        })
    })

    controller.addRoute("/:userId", {
        GET: function (req, res, opts, cb) {
            model.get(opts.userId, function (err, user) {
                if (err) {
                    return cb(err)
                }

                if (!user) {
                    return cb(UserNotFound(opts.userId))
                }

                sendHtml(req, res, userPage(user, viewsConfig))
            })
        },
        POST: function (req, res, opts, cb) {
            formBody(req, res, function (err, body) {
                if (err) {
                    return cb(err)
                }

                model.setName(opts.userId, body.name, function (err, user) {
                    if (err) {
                        return cb(err)
                    }

                    // setMessage('Information updated!')
                    redirect(req, res, prefix + "/" + opts.userId)
                })
            })
        }
    })

    return controller
}
