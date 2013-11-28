// based on https://github.com/visionmedia/express/blob/master/examples/web-service/index.js
var http = require("http")
var url = require("url")
var Router = require("routes-router")
var TypedError = require("error/typed")
var sendJson = require("send-data/json")

// TypedError is a an error creation blueprint.
// It will create errors with the message and a statusCode property
// The statusCode property can be used in the error handler
// routes-router also respects this by default.

var KEY_REQUIRED = TypedError({
    message: "Api key required",
    statusCode: 400
})
var INVALID_KEY = TypedError({
    message: "Invalid api key",
    statusCode: 401
})
var NOT_FOUND_ERROR = TypedError({
    message: "Couldn't find user %s",
    statusCode: 404
})

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

var apiKeys = ["foo", "bar", "baz"];

// these two objects will serve as our faux database

var repos = [
    { name: "express", url: "http://github.com/visionmedia/express" },
    { name: "stylus", url: "http://github.com/learnboost/stylus" },
    { name: "cluster", url: "http://github.com/learnboost/cluster" }
]

var users = [
    { name: "tobi" },
    { name: "loki" },
    { name: "jane" }
]

var userRepos = {
    tobi: [repos[0], repos[1]],
    loki: [repos[1]],
    jane: [repos[2]]
}

// this is our validation logic
// our validator is a function that looks like a route handler
// but returns either an error or the key. This should be called
// in your other route handlers

function validate(req, res, opts, callback) {
    var key = url.parse(req.url, true).query["api-key"]

    if (!key) {
        return callback(KEY_REQUIRED())
    }

    if (apiKeys.indexOf(key) === -1) {
        return callback(INVALID_KEY())
    }

    callback(null, key)
}

// you can configure the router with a custom error handler
// by default it uses `send-data/error`
// you can also configure it with a custom notFound handler
var app = Router({
    notFound: function notFound(req, res) {
        sendJson(req, res, {
            statusCode: 404,
            body: { error: "Lame, can't find that" }
        })
    },
    errorHandler: function (req, res, err) {
        sendJson(req, res, {
            statusCode: err.statusCode || 500,
            body: { error: err.message }
        })
    }
})


// we call the validate function in our route handlers to
// ensure that each route handles validation

/* this code looks verbose, but that's just the fault of callbacks.
    If we were to use generators for flow control it would look cleaner

app.addRoute("/api/users", function* (req, res) {
    yield validate.bind(null, req, res)

    sendJson(req, res, users)
})

app.addRoute("/api/repos", function* (req, res) {
    yield validate.bind(null, req, res)

    sendJson(req, res, repos)
})
*/

app.addRoute("/api/users", function(req, res, opts, callback) {
    validate(req, res, opts, function (err) {
        if (err) {
            return callback(err)
        }

        sendJson(req, res, users)
    })
})

app.addRoute("/api/repos", function (req, res, opts, callback) {
    validate(req, res, opts, function (err) {
        if (err) {
            return callback(err)
        }

        sendJson(req, res, repos)
    })
})

app.addRoute("/api/user/:name/repos", function (req, res, opts, cb) {
    validate(req, res, opts, function (err) {
        if (err) {
            return cb(err)
        }

        var name = opts.name
        var user = userRepos[name]

        if (user) {
            return sendJson(req, res, user)
        }

        // you can pass an argument to NOT_FOUND_ERROR and that value
        // will be placed in %s. Notice that we are handling the 404 case here
        cb(NOT_FOUND_ERROR(name))
    })
})

var server = http.createServer(app)
server.listen(3000)
console.log("web service server listening on port 3000")
