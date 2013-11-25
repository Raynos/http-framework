var http = require("http")
var Router = require("routes-router")
var redirect = require("redirecter")
var sendHtml = require("send-data/html")
var formBody = require("body/form")
var Cookies = require("cookies")

var SECOND = 1000
var MINUTE = 60 * SECOND

var app = Router()

app.addRoute("/", {
    GET: function (req, res) {
        var cookies = new Cookies(req, res)

        if (cookies.get("remember")) {
            sendHtml(req, res, "Remembered :). Click to " +
                "<a href='/forget'>forget</a>")
        } else {
            sendHtml(req, res, "<form method='post'><p>Check to <label>" +
                "<input type='checkbox' name='remember' />" +
                " remember me </label>" +
                "<input type='submit' value='Submit' />.</p></form>")
        }
    },
    POST: function (req, res, opts, cb) {
        formBody(req, res, function (err, body) {
            if (err) {
                return cb(err)
            }

            var cookies = new Cookies(req, res)
            if (body.remember) {
                cookies.set("remember", 1, { maxage: MINUTE })
            }

            redirect(req, res, "back")
        })
    }
})

app.addRoute("/forget", function (req, res) {
    var cookies = new Cookies(req, res)
    cookies.set("remember", "", { expires: new Date(0) })
    redirect(req, res, "back")
})

var server = http.createServer(app)
server.listen(3000)
console.log("cookies server is listening on port 3000")
