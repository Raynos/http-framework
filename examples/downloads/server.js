var http = require("http")
var basename = require("path").basename
var fs = require("fs")
var Router = require("routes-router")
var sendHtml = require("send-data/html")
var filed = require("filed")

var app = Router()

app.addRoute("/", function (req, res) {
    sendHtml(req, res, "<ul>" +
        "<li>Download <a href='/files/amazing.txt'>amazing.txt</a></li>" +
        "<li>Download <a href='/files/missing.text'>missing.txt</a></li>" +
        "</ul>")
})

app.addRoute("/files/*", function (req, res, opts, cb) {
    var file = opts.splats[0]
    var uri = __dirname  + "/files/" + file

    fs.stat(uri, function (err, stat) {
        // 404
        if (err && err.code === "ENOENT") {
            res.statusCode = 404
            return res.end("Cant find that file, sorry!")
        } else if (err) {
            return cb(err)
        }

        res.setHeader("Content-Disposition", "attachment; filename=\"" +
            basename(uri) + "\"")
        filed(uri).pipe(res)
    })
})

var server = http.createServer(app)
server.listen(3000)
console.log("downloads server listening on port 3000")
