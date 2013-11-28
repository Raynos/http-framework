// based on https://github.com/visionmedia/express/blob/master/examples/cookie-sessions/index.js
var http = require("http")
var Router = require("routes-router")
var Cookies = require("cookies")

var app = Router()

app.addRoute("*", function (req, res) {
    var cookies = new Cookies(req, res)
    var count = Number(cookies.get("count") || "0") + 1
    cookies.set("count", String(count))

    res.end("viewed " + count + " times\n")
})

var server = http.createServer(app)
server.listen(3000)
console.log("cookie session server listening on port 3000")
