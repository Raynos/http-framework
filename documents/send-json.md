# [`send-json`](https://github.com/Raynos/send-data)

> I want to send a JSON payload to my user

```js
var http = require("http")
var sendJson = require("send-data/json")

http.createServer(function (req, res) {
    sendJson(req, res, {
        sending: "json"
    })
}).listen(8080)
```

## Alternatively by hand:

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
