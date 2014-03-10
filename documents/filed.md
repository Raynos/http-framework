# [`filed`](https://github.com/mikeal/filed)

> I want to send a file down a response

Using `filed` you will stream a file down the `HttpResponse`. The usage
  of streaming the payload is nice for efficiency and memory usage.

```js
var http = require("http")
var filed = require("filed")

http.createServer(function (req, res) {
    filed(__dirname + "/static/index.html").pipe(res)
}).listen(8080)
```

## Alternatively by hand:

```js
var http = require("http")
var fs = require("fs")

http.createServer(function (req, res) {
    var filePath = __dirname + "/static/index.html"
    // optionally stat the file your streaming. This allows you
    // to set the Content-Length header.
    fs.stat(filePath, function (err, stat) {
        if (err) {
            // the ENOENT code means no such file or directory
            if (err.code === "ENOENT") {
                res.statusCode = 404
                return res.end("Not Found")
            }
            
            res.statusCode = 500
            return res.end(err.message)
        }

        // you can skip the fs.stat call and just stream the content directly
        var stream = fs.createReadStream(__dirname + "/static/index.html")
        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.setHeader("Content-Type", stat.size)
        stream.pipe(res)
    })
}).listen(8080)
```
