var basename = require("path").basename
var fs = require("fs")
var filed = require("filed")

// this should be a module on npm
module.exports = serveFileDownload

function serveFileDownload(req, res, uri, cb) {
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
}
