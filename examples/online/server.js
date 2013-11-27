// https://github.com/visionmedia/express/blob/master/examples/online/index.js

var http = require("http")
var Router = require("routes-router")
var redis = require("redis")
var Online = require("online")
var sendHtml = require("send-data/html")

var db = redis.createClient()
var online = Online(db)
var app = Router()

function lists(ids) {
    return "<ul>" + ids.map(function (id) {
        return "<li>" + id + "</li>"
    }).join("") + "</ul>"
}

// GET users online
app.addRoute("/", function (req, res, opts, cb) {
    online.last(5, function (err, ids) {
        if (err) {
            return cb(err)
        }

        sendHtml(req, res, "<p>Users online: " + ids.length +
            "</p>" + lists(ids))
    })
})

// if you want to do something globally you should put it in
// your server request response handler
var server = http.createServer(function (req, res) {
    // activity tracking, in this case the UA string
    // normally you would get it from the session
    online.add(req.headers["user-agent"])
    app(req, res)
})
server.listen(3000)
console.log("online server listening on port 3000")
