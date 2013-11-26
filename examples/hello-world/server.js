var http = require("http")

var app = http.createServer(function (req, res) {
    res.end("Hello World")
})

app.listen(3000)
console.log("hello world server listening on port 3000")
