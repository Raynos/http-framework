# [`csrf-lite`](https://github.com/isaacs/csrf-lite)

> I want to secure a HTML form post against cross site attack vectors

If you do not protect your HTML forms then other websites can submit
  your forms on other users behalf and thus hijack their sessions.

This is based on the fact they can just guess the field names and
  values. To circumvent this we can CSRF to put an effectively
  random field in the form that can't be guessed by malicious
  third party websites

```js
var http = require("http")
var querystring = require("querystring")
var csrf = require("csrf-lite")
var Cookies = require("cookies")

http.createServer(function (req, res) {
    var token = getToken(req, res)

    // render a HTML form. put the csrf token in there as 
    // a html hidden input field
    if (req.method === "GET") {
        res.setHeader("Content-Type", "text/html")
        res.end("<html><form method=post>" +
          "<label>Name <input name=name></label>" +
          csrf.html(token) +
          "<input type=submit value=submit>" +
          "</form></html>");
    } else if (req.method === "POST") {
        var body = ""
        req.on("data", function (chunk) {
            body += chunk
        })
        req.on("end", function () {
            var payload = querystring.parse(body)

            var valid = csrf.validate(payload, token)
            if (!valid) {
                res.statusCode = 403
                return res.end("invalid csrf")
            }

            res.end("ok! " + payload.name)
        })
    }
}).listen(8080)

function getToken(req, res) {
    // use the sessionId as the token
    var token = cookies.get("ssid")

    if (!token) {
        token = crypto.randomBytes(24).toString("base64")
        res.setHeader("Set-Cookie", "ssid=" + token)
    }

    return token
}
```

## Alternatively by hand:

```js
var http = require("http")
var querystring = require("querystring")
var crypto = require("crypto")

http.createServer(function (req, res) {
    var token = getToken(req, res)

    // render a HTML form. put the csrf token in there as 
    // a html hidden input field
    if (req.method === "GET") {
        // HTML encode the token so it can be inserted into a form
        token = token.replace(/"/g, "&quot;")
        res.setHeader("Content-Type", "text/html")
        res.end("<html><form method=post>" +
          "<label>Name <input name=name></label>" +
          "<input type=hidden name=x-csrf-token value=\"" + token + "\">" +
          "<input type=submit value=submit>" +
          "</form></html>");
    } else if (req.method === "POST") {
        var body = ""
        req.on("data", function (chunk) {
            body += chunk
        })
        req.on("end", function () {
            var payload = querystring.parse(body)

            var csrfToken = payload["x-csrf-token"]
            if (csrfToken !== token) {
                res.statusCode = 403
                return res.end("invalid csrf")
            }

            res.end("ok! " + payload.name)
        })
    }
}).listen(8080)

function getToken(req, res) {
    var cookie = req.headers.cookie || ""

    // parse cookie out
    var pairs = cookie.split(";")
    var obj = {}
    pairs.forEach(function (pair) {
        var parts = pair.split("=")
        obj[parts[0].trim()] = parts[1].trim()
    })

    // use the sessionId as the token
    var token = obj.ssid

    if (!token) {
        token = csrf()
        cookies.set("ssid", token)
    }

    return token
}
```

