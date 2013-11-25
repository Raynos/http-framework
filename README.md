# http-framework

A web framework based purely on `require('http')`

## Motivation

`require('http')` is a web framework. All you need to add a few
  small modules that do one thing well when your building your
  web application route handlers.

This module aggregates and documents (with examples) a selection
  of small modules that can be used to achieve this goal.

I do not recommend you use this "framework". You should check
  out the small modules and use them directly. Use the list of
  examples here for inspiration.

## [Examples][17]

The examples are clones of [`express`][18] examples demonstrating
  how to author web apps without frameworks.

Credit for the applications goes to

 - @visionmedia & express maintainers

see [the examples folder][17]

## [Modules][20]

See the [`package.json`][19] dependencies hash for an example of
  many small modules used in the examples folder of this project.

For a complete list of [Modules check out the wiki][20]

## Documentation

### [`filed`](https://github.com/mikeal/filed)

> I want to send a file down a response

Using `filed` you will stream a file down the `HttpResponse`. The usage
  of streaming the payload is nice for efficiency and memory usage.

```js
var http = require("http")
var filed = require("http-framework/filed")

http.createServer(function (req, res) {
    filed(__dirname + "/static/index.html").pipe(res)
}).listen(8080)
```

Alternatively by hand:

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

### [`form-body`](https://github.com/Raynos/body)

> I want to read the body of a HTML &lt;form&gt; submission.

```js
var http = require("http")
var formBody = require("http-framework/form-body")

http.createServer(function (req, res) {
    formBody(req, res, function (err, body) {
        if (err) {
            res.statusCode = 500
            res.end(err.message)
        }

        res.end("you submitted " + JSON.stringify(body))
    })
}).listen(8080)
```

Alternatively by hand:

```js
var http = require("http")
var querystring = require("qs")

http.createServer(function (req, res) {
    var requestBody = ""

    req.on("data", function (chunk) {
        requestBody += chunk
    })

    req.once("end", function () {
        var body = querystring.parse(requestBody)

        res.end("you submitted " + JSON.stringify(body))
    })

    req.once("error", function (err) {
        res.statusCode = 500
        res.end(err.message)
    })
}).listen(8080)
```

### [`send-json`](https://github.com/Raynos/send-data)

> I want to send a JSON payload to my user

```js
var http = require("http")
var sendJson = require("http-framework/send-json")

http.createServer(function (req, res) {
    sendJson(req, res, {
        sending: "json"
    })
}).listen(8080)
```

Alternatively by hand:

```js
var http = require("http")

http.createServer(function (req, res) {
    // notice creating a buffer from the string
    var payload = new Buffer(JSON.stringify({
        sending: "json"
    }))
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    // ensure Content-Length is number of bytes, not number of characters
    res.setHeader("Content-Length", payload.length)
    res.end(payload)
}).listen(8080)
```

### [`send-html`](https://github.com/Raynos/send-data)


> I want to send a HTML payload to my user

```js
var http = require("http")
var fs = require("fs")
var sendHtml = require("http-framework/send-html")

var page = fs.readFileSync(__dirname + "/static/index.html")

http.createServer(function (req, res) {
    sendHtml(req, res, page)
}).listen(8080)
```

Alternatively by hand:

```js
var http = require("http")
var fs = require("fs")

// note that fs.readFileSync returns a buffer
var page = fs.readFileSync(__dirname + "/static/index.html")

http.createServer(function (req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    // ensure Content-Length is number of bytes, not number of characters
    res.setHeader("Content-Length", page.length)
    res.end(page)
}).listen(8080)
```

### rest of the modules

```js
// TODO
```

For now see the [examples folder][17]

## Todo

 - [ ] Finish porting express examples
 - [ ] Port connect examples
 - [ ] Port hapi examples
 - [ ] Port restify examples
 - [ ] Port partial.js examples
 - [ ] Finish documentation
 - [ ] Get community feedback
 - [ ] Author new fresh examples


## Installation

`npm install http-framework`

## Contributors

 - Raynos

## MIT Licenced

  [17]: https://github.com/Raynos/http-framework/tree/master/examples
  [18]: https://github.com/visionmedia/express
  [19]: https://github.com/Raynos/http-framework/blob/master/package.json#L19
  [20]: https://github.com/Raynos/http-framework/wiki/Modules
