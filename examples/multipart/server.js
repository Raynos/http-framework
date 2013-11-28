// based on https://github.com/visionmedia/express/blob/master/examples/multipart/index.js
var http = require("http")
var os = require("os")
var fs = require("fs")
var path = require("path")
var util = require("util")
var Router = require("routes-router")
var sendHtml = require("send-data/html")
var MultipartyForm = require("./multiparty-form.js")

var app = Router()

app.addRoute("/", {
    GET: function (req, res) {
        sendHtml(req, res,
            "<form method='post' enctype='multipart/form-data'>" +
            "<p>Title: <input type='text' name='title' /></p>" +
            "<p>Image: <input type='file' name='image' /></p>" +
            "<p><input type='submit' value='Upload' /></p>" +
            "</form>")
    },
    POST: function (req, res, opts, cb) {
        // we tell the multi part form parser what to do with 
        // each part it comes across. In this case we are storing
        // them to disk using `storeFile`
        MultipartyForm(req, res, {
            handlePart: storeFile
        }, function (err, values) {
            if (err) {
                return cb(err)
            }

            // fields are all the non file inputs in the form
            var title = values.fields.title
            // image is a { location, filename } object returned
            // by storeFile
            var image = values.files.image

            // stat the file to figure out how large it is
            fs.stat(image.location, function (err, stat) {
                if (err) {
                    return cb(err)
                }

                var message = util.format("uploaded %s (%d Kb) to %s as %s",
                    image.filename,
                    Math.round(stat.size / 1024),
                    image.location,
                    title)

                // cool now lets get rid of that file or 
                // we accumulate garbage forever
                // in production you should upload to s3 or something
                fs.unlink(image.location, function (err) {
                    if (err) {
                        return cb(err)
                    }

                    sendHtml(req, res, message)
                })
            })
        })
    }
})

function storeFile(part, callback) {
    // we have an file stream lets save it to disk!!
    // multiparty-form does not save to disk for you.
    // if it does so then that's a disk overload attack vector

    var filename = part.filename
    var uploadsDir = path.join(os.tmpdir(), Math.random().toString(32))
    var loc = path.join(uploadsDir, path.basename(filename))

    // WAIT up. we need to create the uploadsDir
    // the uploadsDir is a random directory which allows concurrent
    // uploads of files with the same filename
    fs.mkdir(uploadsDir, function (err) {
        if (err) {
            return callback(err)
        }

        // ok we're good let's store the image
        var dest = fs.createWriteStream(loc)
        part.pipe(dest)
        
        // once we have finished uploading
        dest.once("finish", function () {
            // lets callback with the location
            callback(null, {
                location: loc,
                filename: filename
            })
        })
    })
}

var server = http.createServer(app)
server.listen(3000)
console.log("multipart server listening on port 3000")
