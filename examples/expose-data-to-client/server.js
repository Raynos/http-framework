// based on https://github.com/visionmedia/express/blob/master/examples/expose-data-to-client/index.js
var http = require("http")
var Router = require("routes-router")
var redirect = require("redirecter")
var sendHtml = require("send-data/html")

var template = require("./template.js")

function User(name) {
    this.private = "heyyyy"
    this.secret = "something"
    this.name = name
    this.id = 123
}

// you want to serialize the user without 'secret' stuff
User.prototype.toJSON = function () {
    return { id: this.id, name: this.name }
}

// dummy user loading function
function getUser(req, res, callback) {
    process.nextTick(function () {
        callback(null, new User("Tobi"))
    })
}

var app = Router()

app.addRoute("/", function (req, res) {
    redirect(req, res, "/user")
})

app.addRoute("/user", function (req, res, opts, cb) {
    getUser(req, res, function (err, user) {
        if (err) {
            return cb(err)
        }

        var clientData = { user: user }
        // we expose the clientData by passing it to the template
        // the template will expose this properly.
        // you can pass the data to your layout instead to avoid
        // passing it to every template
        sendHtml(req, res, template(clientData))
    })
})

var server = http.createServer(app)
server.listen(3000)
console.log("expose data to client server listening on port 3000")
