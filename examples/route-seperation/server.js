// based on https://github.com/visionmedia/express/blob/master/examples/route-separation/index.js
var http = require("http")
var Router = require("routes-router")

var home = require("./routes/home.js")
var posts = require("./routes/posts.js")
var users = require("./routes/user/index.js")
var userView = require("./routes/user/view.js")
var userEdit = require("./routes/user/edit.js")

var app = Router()

// general routes
app.addRoute("/", home)

// user routes
app.addRoute("/users", users)
app.addRoute("/users/:id", userView)
app.addRoute("/users/:id/view", userView)
app.addRoute("/users/:id/edit", userEdit)

// post routes
app.addRoute("/posts", posts)

var server = http.createServer(app)
server.listen(3000)
console.log("route separated server listening on port 3000")

