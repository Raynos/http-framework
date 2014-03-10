# [`send-html`](https://github.com/Raynos/send-data)

> I want to send a HTML payload to my user

```js
var http = require("http")
var fs = require("fs")
var sendHtml = require("send-data/html")

var page = fs.readFileSync(__dirname + "/static/index.html")

http.createServer(function (req, res) {
    sendHtml(req, res, page)
}).listen(8080)
```

## Alternatively by hand:

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
