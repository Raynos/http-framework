// based on https://github.com/visionmedia/express/blob/master/examples/session/redis.js
var http = require("http")
var Router = require("routes-router")
var Session = require("redsess")
var Redis = require("redis")
var sendHtml = require("send-data/html")

// create a single redis connection. This is shared among all
// req/res pairs in your server
var client = Redis.createClient()

var app = Router()

app.addRoute("/", function (req, res, opts, cb) {
    var session = Session(req, res, { client: client })

    // get a value of the session is a database read is async
    session.get("views", function (err, views) {
        if (err) {
            return cb(err)
        }

        views = views || 0
        views++

        // setting a value in the session is a database write and
        // is async
        session.set("views", views, function (err) {
            if (err) {
                return cb(err)
            }

            var html = ""

            if (views === 1) {
                html += "<p>First time visiting?" +
                    " view this page in several browsers :)</p>"
            }

            sendHtml(req, res, html + "<p>viewed <strong>" +
                views + "</strong> times.</p>")
        })
    })
})

var server = http.createServer(app)
server.listen(3000)
console.log("redis session server on port 3000")

