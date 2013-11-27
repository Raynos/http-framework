var http = require("http")
var path = require("path")
var console = require("console")
var process = require("process")
var Router = require("routes-router")
var cc = require("config-chain")
var sendHtml = require("send-data/html")
var st = require("st")
var extend = require("xtend")

// global views live in the top level views folder
var errorPage = require("./views/error-page.js")
var notFoundPage = require("./views/not-found.js")
var layout = require("./views/layout.js")
var Db = require("./db.js")

// NODE_ENV is used to turn a server from local to production
// `$ NODE_ENV=production node server.js`
var NODE_ENV = process.env.NODE_ENV

// We use config chain to load config files. This grabs the default
// config and overwrites it with the NODE_ENV config for 
// config.production.json or config.developer.json if it exists
var config = cc(
    path.join(__dirname, "config", "config.json"),
    path.join(__dirname, "config", "config." + NODE_ENV + ".json")
).store

// store the layout on the config. This way other features
// can use the same layout!
config.layout = layout
// store the database on the config. This way other features
// can all share the same database
config.db = Db(config)

var app = Router({
    errorHandler: function (req, res, err) {
        if (err.statusCode === 404) {
            return this.notFound(req, res)
        }

        // log the stack
        console.log(err.stack)

        // send error page
        sendHtml(req, res, errorPage(err))
    },
    notFound: function (req, res) {
        sendHtml(req, res, notFoundPage(req.url))
    }
})

// configure static file server globally. Note that features
// don't reference /static in their views. Only the global
// layout does.
app.addRoute("/static/*", st({
    path: path.join(__dirname, "static"),
    url: "/static"
}))

var MainFeature = require("./features/main.js")
var UserFeature = require("./features/user.js")

// Load the main feature into our server
// we tell the feature what uri it's mounted at using uri on the config
app.addRoute("/", MainFeature(extend(config, { uri: "/" })))

app.addRoute("/user", UserFeature(extend(config, { uri: "/user" })))

var server = http.createServer(app)
server.listen(3000)
console.log("MVC server listening on port 3000")
