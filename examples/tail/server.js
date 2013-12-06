// based on https://github.com/spumko/hapi/blob/master/examples/tails.js
var http = require("http")
var Router = require("routes-router")
var sendText = require("send-data")
var setTimeout = require("timers").setTimeout

// configure the Tail so that it does your own error handling
// in this case we log things
var tail = Tail(function errorHandler(err, meta) {
    console.log("error happened %s on uri %s for event %s with key %s", 
        err.message, meta.req.url, meta.name, meta.key)
}, function succcesHandler(result, meta) {
    console.log("operation succeeded %s", meta.name)
})
var app = Router()

// fakeCache. We can update something in the cache.
// The cache will asynchronously break
var fakeCache = {
    update: function (key, value, cb) {
        setTimeout(function () {
            cb(new Error("cache oops"))
        }, 200)
    }
}

// our app will update a cache for a key and a value
// we do not want our application to wait to hear back from
// the database so we end the response immediately.
// however we do want to configure error handling in one place
// and have the error from the async thing be reported properly
app.addRoute("/:key/:value", function (req, res, opts) {
    var callback = tail("fakeCache", {
        req: req,
        res: res,
        key: opts.key
    })
    fakeCache.update(opts.key, opts.value, callback)

    sendText(req, res, "successfully saved thing")
})

var server = http.createServer(app)
server.listen(3000)
console.log("tail server listening on port 3000")

function Tail(errorHandler, succcesHandler) {
    function tail(name, opts) {
        opts.name = name

        return callback

        function callback(err, result) {
            if (err) {
                errorHandler(err, opts)
            } else if (succcesHandler) {
                succcesHandler(result, opts)
            }
        }
    }

    return tail
}
