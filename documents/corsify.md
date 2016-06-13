# [`corsify`](https://github.com/raynos/corsify)

> I want to be able to make cross domain ajax requests to my web server

You can set CORS headers on your `res` that allow browsers to make
    http ajax requests from other domains bypassing the same
    domain restriction.

This is useful if you have a public HTTP API server that other
    developers & clients use or if your API server is on a different
    domain / port then your web server.

```js
var http = require("http")
var Corsify = require("corsify")

http.createServer(Corsify({
    // you should not allow all origins! That's a security risk
    // you can use getOrigin to whitelist the origin.
    // whatever you return becomes the Access-Control-Allow-Origin
    // HTTP header.
    getOrigin: function (req, res) {
        var origin = req.headers.origin

        // manually white list allowed CORS servers
        if (origin === "http://web.my-server.com") {
            return "http://web.my-server-.com"
        }
    }
}, function () {
    res.end("API server! CORS me.")
})).listen(8080)
```

## Alternatively by hand:

```js
var http = require("http")

http.createServer(function (req, res) {
    var origin = req.headers.origin

    if (origin === "http://web.my-server.com") {
        res.setHeader("Access-Control-Allow-Origin", origin)
    }

    res.setHeader("Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Max-Age", "86400")
    res.setHeader("Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Accept")

    // CORS in browsers send a preflight OPTIONS HTTP request
    // for POSTs to see whether making a HTTP request to this
    // end point is allowed. You should handle `OPTIONS` separately
    // from `GET` / `POST` / other headers.
    if (req.method === "OPTIONS") {
        return res.end()
    }

    res.end("API Server! CORS me.")
}).listen(8080)
```
