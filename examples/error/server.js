// based on https://github.com/visionmedia/express/blob/master/examples/error/index.js
var http = require("http")
var Router = require("routes-router")

var app = Router({
    // you can define your own error handler. If you call the cb
    // in (req, res, opts, cb) in your routes then this error
    // handler gets called
    errorHandler: function (req, res, err) {
        res.statusCode = 500
        res.end(err.message || "Internal server error")
    }
})

app.addRoute("/", function (req, res, opts, cb) {
    // try catch is slow. do not throw. pass them to cb
    cb(new Error("something broke!"))
})

app.addRoute("/next", function (req, res, opts, cb) {
    // you can pass asynchronous exceptions to the cb
    process.nextTick(function () {
        cb(new Error("oh no!"))
    })
})

var server = http.createServer(app)
server.listen(3000)
console.log("error server listening on port 3000")
