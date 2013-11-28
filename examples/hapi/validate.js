var http = require("http")
var console = require("console")
var url = require("url")
var Router = require("routes-router")
var jsonBody = require("body/json")
var sendText = require("send-data")
var Joi = require("joi")

var app = Router()

var usersSchema = {
    title: Joi.string(),
    status: Joi.string().valid("open", "pending", "close"),
    participants: Joi.array().includes(Joi.string(), Joi.number())
}

app.addRoute("/", validateQuery({ username: Joi.string() }, sendSuccess))

app.addRoute("/admin", validateQuery({
    username: Joi.string().required().with("password"),
    password: Joi.string()
}, sendSuccess))

app.addRoute("/users", validateQuery({
    email: Joi.string().email().required().min(18)
}, sendSuccess))

app.addRoute("/config", validateQuery({
    choices: Joi.array().required()
}, sendSuccess))

app.addRoute("/test", validateQuery({
    num: Joi.number().min(0)
}, sendSuccess))

app.addRoute("/test2", validateQuery({
    p1: Joi.string().required().rename("itemId")
}, sendSuccess))

app.addRoute("/simple", validateQuery({
    input: Joi.string().min(3)
}, sendSuccess))

app.addRoute("/users/{id}", { "POST": userId })

http.createServer(app).listen("3000", function () {
    console.log("Listening on port 3000")
})

function validateQuery(schema, routeHandler) {
    return function (req, res, opts, cb) {
        var queryObject = url.parse(req.url, true).query
        var err = Joi.validate(queryObject, schema)

        if (err){
            return cb(err._errors)
        }

        // We can choose to pass the query object along so that we don't
        // have to compute it again
        opts.query = queryObject

        routeHandler(req, res, opts, cb)
    }
}

function userId(req, res, opts, cb) {
    jsonBody(req, res, function (err, body) {
        if (err) {
            return cb(err)
        }

        var errors = Joi.validate(body, usersSchema)
        if (errors) {
            return cb(errors._errors)
        }

        sendSuccess(req, res)
    })
}

function sendSuccess(req, res) {
    sendText(req, res, "Success!")
}
