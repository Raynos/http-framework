// inspired by https://github.com/visionmedia/express/blob/master/examples/vhost/index.js

/*
edit /etc/hosts:

127.0.0.1       foo.example.com
127.0.0.1       bar.example.com
127.0.0.1       example.com
*/

var http = require("http")
var redirecter = require("redirecter")
var Router = require("routes-router")

var vhost = require("./vhost.js")

var main = Router()

main.addRoute("/", function (req, res) {
    res.end("Hello from main app!")
})
main.addRoute("/:sub", function (req, res, opts) {
    res.end("you requested " + opts.sub)
})

// redirect router

var redirect = Router()

redirect.addRoute("*", function (req, res) {
    var subdomains = (req.headers.host || "").split(".")

    redirecter(req, res, "http://example.com:3000/" + subdomains[0])
})

var app = Router()
app.addRoute("*", vhost({
    "*.example.com": redirect,
    "example.com": main
}))

var server = http.createServer(app)
server.listen(3000)
console.log("vhost server started on port 3000")
