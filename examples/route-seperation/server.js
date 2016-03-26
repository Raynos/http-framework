// based on https://github.com/visionmedia/express/blob/master/examples/route-separation/index.js
var http = require("http")
var Router = require("http-hash-router")

var home = require("./routes/home.js")
var posts = require("./routes/posts.js")
var users = require("./routes/user/index.js")
var userView = require("./routes/user/view.js")
var userEdit = require("./routes/user/edit.js")

var router = Router()

// general routes
router.set("/", home)

// user routes
router.set("/users", users)
router.set("/users/:id", userView)
router.set("/users/:id/view", userView)
router.set("/users/:id/edit", userEdit)

// post routes
router.set("/posts", posts)

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
console.log("route seperated server listening on port 3000")
