var sendHtml = require("send-data/html")

var postsPage = require("../templates/posts/index.js")

// Fake posts database
var posts = [
    { title: "Foo", body: "some foo bar" },
    { title: "Foo bar", body: "more foo bar" },
    { title: "Foo bar baz", body: "more foo bar baz" }
]

module.exports = postsRoute

function postsRoute(req, res) {
    sendHtml(req, res, postsPage({ title: "Posts", posts: posts }))
}
