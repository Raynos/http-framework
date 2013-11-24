// based on https://github.com/visionmedia/express/blob/master/examples/route-map/index.js
var http = require("http")
var Router = require("routes-router")
var sendText = require("send-data")

var map = require("./map.js")

var app = Router()

var users = {
    list: function (req, res) {
        sendText(req, res, "user list")
    },
    get: function (req, res, opts) {
        sendText(req, res, "user " + opts.uid)
    },
    del: function (req, res) {
        sendText(req, res, "delete users")
    }
}
var pets = {
    list: function (req, res, opts) {
        sendText(req, res, "user " + opts.uid + "'s pets")
    },
    del: function (req, res, opts) {
        sendText(req, res, "delete " + opts.uid + "'s pet " + opts.pid)
    }
}

map(app, {
    "/users": {
        GET: users.list,
        DELETE: users.del,
        "/:uid": {
            GET: users.get,
            "/pets": {
                GET: pets.list,
                "/:pid": {
                    DELETE: pets.del
                }
            }
        }
    }
})

var server = http.createServer(app)
server.listen(3000)
console.log("map example server is listening on port 3000")
