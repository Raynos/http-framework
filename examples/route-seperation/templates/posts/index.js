var h = require("hyperscript")

var layout = require("../layout.js")

module.exports = posts

function posts(opts) {
    return layout(opts.title, [
        h("h1", "Posts"),
        h("dl#posts", opts.posts.map(function (post) {
            return [
                h("dt", post.title),
                h("dd", post.body)
            ]
        }))
    ])
}
