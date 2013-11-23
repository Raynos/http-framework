// based on https://github.com/visionmedia/express/blob/master/examples/static-files/index.js

var http = require("http")
var st = require("st")
var Router = require("routes-router")

var app = Router()

// Serve all the static assets prefixed at /static
// so GET /static/js/app.js will work. 
app.addRoute("/static/*", st({
    path: __dirname + "/static",
    url: "/static"
}))

// for all routes try serve the files statically
app.addRoute("*", st(__dirname + "/static"))

var server = http.createServer(app)
server.listen(3000)

console.log("static server listening on port 3000")
console.log("try:")
console.log("  GET /hello.txt")
console.log("  GET /js/app.js")
console.log("  GET /css/style.css")
