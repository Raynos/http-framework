# [`form-body`](https://github.com/Raynos/body)

> I want to read the body of a HTML &lt;form&gt; submission.

```js
var http = require("http")
var formBody = require("body/form")

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

## Alternatively by hand:

```js
var http = require("http")
var querystring = require("qs")
var StringDecoder = require("string_decoder").StringDecoder

http.createServer(function (req, res) {
    var requestBody = ""
    // use a StringDecoder to parse two byte UTF8 characters.
    // if you use string concatenation you might get half of
    // a two byte character and your body will be wrong
    var stringDecoder = new StringDecoder()

    req.on("data", onData)
    req.once("end", onEnd)
    req.once("error", onError)

    function onData(chunk) {
        requestBody += stringDecoder.write(chunk)
    }

    function onEnd() {
        // remove listeners to avoid leaks
        req.removeListener("data", onData)
        req.removeListener("error", onError)

        requestBody += stringDecoder.end()

        var body = querystring.parse(requestBody)

        res.end("you submitted " + JSON.stringify(body))
    }

    function onError(err) {
        // // remove listeners to avoid leaks
        req.removeListener("data", onData)
        req.removeListener("end", onEnd)

        res.statusCode = 500
        res.end(err.message)
    }
}).listen(8080)
```

Note that this hand written alternative has a buffer overflow
attack in it. It never keeps appending to `requestBody` and 
will crash the process if someone sends you a chunked encoded
body of 100s of GBs.
