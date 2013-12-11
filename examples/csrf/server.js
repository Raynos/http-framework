// https://github.com/senchalabs/connect/blob/master/examples/csrf.js

var http = require("http")
var Router = require("routes-router")
var formBody = require("body/form")
var sendHtml = require("send-data/html")
var redirect = require("redirecter")
var Session = require("generic-session")
var MemoryStore = require("generic-session").MemoryStore
var csrf = require("csrf-lite")
var Cookies = require("cookies")

var template = require("./template.js")

var store = MemoryStore()
var app = Router()

app.addRoute("/", {
    "GET": function (req, res, opts, cb) {
        var session = Session(req, res, store)
        var token = getToken(req, res)

        session.get("user", function (err, user) {
            if (err) {
                return cb(err)
            }

            sendHtml(req, res, template({
                token: token, name: user && user.name
            }))
        })
    },
    "POST": function (req, res, opts, cb) {
        var token = getToken(req, res)
        var session = Session(req, res, store)

        formBody(req, res, function (err, body) {
            if (err) {
                return cb(err)
            }

            var isValid = csrf.validate(body, token)
            if (!isValid) {
                return cb(new Error("INVALID CSRF"))
            }

            session.set("user", { name: body.name }, function (err) {
                if (err) {
                    return cb(err)
                }

                redirect(req, res, "/")
            })
        })
    }
})

var server = http.createServer(app)
server.listen(3000)
console.log("CSRF server listening on port 3000")

function getToken(req, res) {
    var cookies = Cookies(req, res)

    // use the sessionId as the token
    var token = cookies.get("ssid")

    if (!token) {
        token = csrf()
        cookies.set("ssid", token)
    }

    return token
}
