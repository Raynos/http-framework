// https://github.com/visionmedia/express/blob/master/examples/content-negotiation/index.js
var http = require("http")
var Router = require("routes-router")
var mediaTypes = require("media-types")
var sendText = require("send-data")
var sendJson = require("send-data/json")
var sendHtml = require("send-data/html")

var users = [
    { name: "Tobi" },
    { name: "Loki" },
    { name: "Jane" }
]

var app = Router()

app.addRoute("/", mediaTypes({
    "text/html": function (req, res) {
        sendHtml(req, res, "<ul>" + users.map(function (user) {
            return "<li>" + user.name + "</li>"
        }).join("") + "</ul>")
    },
    "application/json": function (req, res) {
        sendJson(req, res, users)
    },
    "default": function (req, res) {
        sendText(req, res, users.map(function (user) {
            return " - " + user.name + "\n"
        }).join(""))
    }
}))

var server = http.createServer(app)
server.listen(3000)
console.log("content negotiation server listening on port 3000")
