// based on https://github.com/visionmedia/express/tree/master/examples/cors
var http = require("http")
var Router = require("routes-router")
var filed = require("filed")
var Corsify = require("corsify")
var jsonBody = require("body/json")
var sendJson = require("send-data/json")

var app = Router()
var api = Router()

app.addRoute("/", function (req, res) {
    filed(__dirname + "/static/index.html").pipe(res)
})

var cors = Corsify({
    "Access-Control-Allow-Origin": "http://localhost:3000"
})

api.addRoute("/user", cors(function (req, res, opts, cb) {
    jsonBody(req, res, function (err, body) {
        if (err) {
            return cb(err)
        }

        console.log("body", body)
        sendJson(req, res, body)
    })
}))

var appServer = http.createServer(app)
appServer.listen(3000)
console.log("cors app server listening on port 3000")

var apiServer = http.createServer(api)
apiServer.listen(3001)
console.log("cors api server listening on port 3001")
