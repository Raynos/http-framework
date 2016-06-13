var sendHtml = require("send-data/html")

var homePage = require("../templates/home.js")

module.exports = home

function home(req, res) {
    sendHtml(req, res, homePage({ title: "Route separation example"}))
}
