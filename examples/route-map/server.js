// based on https://github.com/visionmedia/express/blob/master/examples/route-map/index.js
var http = require("http")
var Router = require("http-hash-router")
var sendText = require("send-data")

var map = require("./map.js")

var router = Router()

var users = {
    list: function (req, res) {
        sendText(req, res, "user list")
    },
    get: function (req, res, opts) {
        sendText(req, res, "user " + opts.params.uid)
    },
    del: function (req, res) {
        sendText(req, res, "delete users")
    }
}
var pets = {
    list: function (req, res, opts) {
        sendText(req, res, "user " + opts.params.uid + "'s pets")
    },
    del: function (req, res, opts) {
        sendText(req, res, "delete " + opts.params.uid + "'s pet " + opts.params.pid)
    }
}

map(router, {
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

var server = http.createServer(function (req, res) {
  router(req, res, {}, onError)

  function onError (err) {
    if (err) {
      res.statusCode = err.statusCode || 500
      res.end(err.message)
    }
  }
})
server.listen(3000)
console.log("map example server is listening on port 3000")
