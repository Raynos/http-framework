var Router = require("routes-router/child")
var TypedError = require("error/typed")
var sendHtml = require("send-data/html")
var formBody = require("body/form")
var redirect = require("redirecter")
var format = require("string-template")

var petPage = require("./views/show.js")
var editPage = require("./views/edit.js")
var PetModel = require("./model.js")

var PetNotFound = TypedError({
    message: "Pet %s not found",
    type: "pet.not.found",
    statusCode: 404
})

module.exports = PetController

function PetController(config) {
    var prefix = config.features.pet

    var controller = Router({ prefix: prefix })
    var model = PetModel(config.db)

    var viewsConfig = { layout: config.layout, urlMap: {
        "petEdit": format.bind(null, prefix + "/{petId}/edit"),
        "pet": format.bind(null, prefix + "/{petId}")
    } }

    controller.addRoute("/:petId", {
        GET: function (req, res, opts, cb) {
            model.get(opts.petId, function (err, pet) {
                if (err) {
                    return cb(err)
                }

                if (!pet) {
                    return cb(PetNotFound(opts.petId))
                }

                sendHtml(req, res, petPage(pet, viewsConfig))
            })
        },
        POST: function (req, res, opts, cb) {
            formBody(req, res, function (err, body) {
                if (err) {
                    return cb(err)
                }

                model.setName(opts.petId, body.name, function (err, user) {
                    if (err) {
                        return cb(err)
                    }

                    // setMessage('Information updated!')
                    redirect(req, res, prefix + "/" + opts.petId)
                })
            })
        }
    })

    controller.addRoute("/:petId/edit", function (req, res, opts, cb) {
        model.get(opts.petId, function (err, pet) {
            if (err) {
                return cb(err)
            }

            if (!pet) {
                return cb(PetNotFound(opts.petId))
            }

            sendHtml(req, res, editPage(pet, viewsConfig))
        })
    })

    controller

    return controller
}
