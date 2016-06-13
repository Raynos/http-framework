// based on https://github.com/visionmedia/express/blob/master/examples/search/index.js
var http = require("http")
var Router = require("routes-router")
var redis = require("redis")
var filed = require("filed")
var sendJson = require("send-data/json")

// create and instantiate a redis db connection
var db = redis.createClient()
var app = Router()

// initialize db
db.sadd("ferret", "tobi")
db.sadd("ferret", "loki")
db.sadd("ferret", "jane")
db.sadd("cat", "manny")
db.sadd("cat", "luna")

// GET the search page
app.addRoute("/", function (req, res) {
    filed(__dirname + "/page.html").pipe(res)
})

// GET search for :query
app.addRoute("/search/:query?", function (req, res, opts, cb) {
    var query = opts.query
    db.smembers(query, function (err, vals) {
        if (err) {
            return cb(err)
        }

        sendJson(req, res, vals)
    })
})

// serve the javascript client separately.
app.addRoute("/client.js", function (req, res) {
    filed(__dirname + "/client.js").pipe(res)
})

var server = http.createServer(app)
server.listen(3000)
console.log("search app listening on port 3000")
