var http = require("http")
var Router = require("routes-router")
var Session = require("generic-session")
var MemoryStore = require("generic-session").MemoryStore
var sendHtml = require("send-data/html")

// create a single memory store for session data is used by
// all req/res pairs in the http server
var store = MemoryStore()

var app = Router()

app.addRoute("/", function (req, res, opts, cb) {
    var session = Session(req, res, store)

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
console.log("memory session server on port 3000")

