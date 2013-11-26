var http = require("http")
var Router = require("routes-router")
var mediaTypes = require("media-types")
var sendHtml = require("send-data/html")
var sendJson = require("send-data/json")
var sendText = require("send-data")
var TypedError = require("error/typed")

var homePage = require("./templates/index.js")
var fourofourPage = require("./templates/404.js")
var errorPage = require("./templates/500.js")

// enable verbose errors in non production
// start app with NODE_ENV=production to disable them
var verboseErrors = process.env.NODE_ENV !== "production"

var app = Router({
    // add a notFound 404 handler to our router. This will
    // be called by 
    //
    // $ curl http://localhost:3000/notfound
    // $ curl http://localhost:3000/notfound -H "Accept: application/json"
    // $ curl http://localhost:3000/notfound -H "Accept: text/plain"
    notFound: function (req, res) {
        res.statusCode = 404

        // for each different media type serve the 404 differently
        mediaTypes({
            "text/html": function (req, res) {
                // our template is just a function that returns a string
                sendHtml(req, res, fourofourPage(req.url))
            },
            "application/json": function (req, res) {
                sendJson(req, res, { error: "Not Found" })
            },
            "default": function (req, res) {
                sendText(req, res, "Not Found")
            }
        })(req, res)
    },
    // we can specify an error handler for our router. Every call to
    // the cb in (req, res, opts, cb) will call this error handler
    errorHandler: function (req, res, err) {
        // make sure to redirect 404 errors back to the notFound handler
        if (err.statusCode === 404) {
            return this.notFound(req, res)
        }

        res.statusCode = err.statusCode || 500

        sendHtml(req, res, errorPage(err, { verbose: verboseErrors }))
    }
})

var ERROR_403 = TypedError({
    message: "Not allowed",
    type: "not.allowed",
    statusCode: 403
})
var ERROR_404 = TypedError({
    message: "Not Found",
    type: "not.found",
    statusCode: 404
})

app.addRoute("/", function (req, res) {
    sendHtml(req, res, homePage())
})

app.addRoute("/404", function (req, res, opts, cb) {
    // to trigger a 404 just send an error with statusCode === 404
    // to the cb. This is a way to delegate responsibility back 
    // to the notFound handler defined on the Router
    cb(ERROR_404())
})

app.addRoute("/403", function (req, res, opts, cb) {
    // trigger a 403 error
    cb(ERROR_403())
    /* can also be done by hand
    var err = new Error("Not Allowed")
    err.statusCode = 403
    cb(err)
    */
})

app.addRoute("/500", function (req, res, opts, cb) {
    cb(new Error("Keyboard cat"))
})

var server = http.createServer(app)
server.listen(3000)
console.log("error pages server listening on port 3000")
