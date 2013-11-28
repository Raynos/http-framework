// based on https://github.com/visionmedia/express/blob/master/examples/error-pages/index.js
var http = require("http")

var app = http.createServer(function (req, res) {
    res.end("Hello World")
})

app.listen(3000)
console.log("hello world server listening on port 3000")
