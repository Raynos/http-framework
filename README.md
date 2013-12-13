# http-framework

A web framework based purely on `require('http')`

## Motivation

`require('http')` is a web framework. All you need are a few
  small modules that do one thing well when you are building your
  web application route handlers.

This module aggregates and documents (with examples) a selection
  of small modules that can be used to achieve this goal.

It's recommended you check out the:
 
  - [the examples][21]
  - [the documentation][22]
  - [the wiki of modules][23]

I do not recommend you use this "framework". You should check
  out the small modules and use them directly. Use the list of
  examples here for inspiration.

http-framework is an OPEN Open Source Project, see the Contributing 
  section to find out what this means.

## [Examples][17]

### [`express`][18] inspired examples

These examples are clones of [`express`][18] examples demonstrating
  how to author web apps without frameworks.

 - [**auth**](examples/auth)
    An example demonstrating how to login and authenticate users
 - [**auth-helpers**](examples/auth-helpers)
    An example demonstrating how you can restrict certain routes in your
    apps to only be accessed by certain types of users
 - [**content-negotiation**](examples/content-negotiation)
    An example demonstrating how you can return different types of
    content based on what the user asks for in his Accept header.
 - [**cookie-sessions**](examples/cookie-sessions)
    An example of storing session information in a users cookie
 - [**cookies**](examples/cookies)
    An example of setting a cookie to track a user
 - [**cors**](examples/cors)
    An example of adding cors support to your HTTP server
 - [**downloads**](examples/downloads)
    An example of allowing users to download files from your server
 - [**error**](examples/error)
    An example of handling errors in your HTTP server
 - [**error-pages**](examples/error-pages)
    An example of rendering custom 500 and 404 pages in your web
    server
 - [**expose-data-to-client**](examples/expose-data-to-client)
    An example of putting server side state into your template
    so that it can be accessed from browser javascript
 - [**hello-world**](examples/hello-world)
    A simple hello world example
 - [**multipart**](examples/multipart)
    An example demonstrating file uploads and saving them to
    disk temporarily.
 - [**mvc**](examples/mvc)
    An over engineered example of how to structure a slightly
    larger web application. Includes configuration, modularity
    and databases. Take ideas from it, please do not copy paste it
 - [**online**](examples/online)
    An example of using redis and the `online` module to track
    user presence
 - [**route-map**](examples/route-map)
    An example of a `map` utility function that can be used to
    structure your routes differently. This demonstrates you can
    do whatever you want, if you like it, do it.
 - [**route-seperation**](examples/route-seperation)
    An example of spreading your route handlers over multiple
    files. 
 - [**search**](examples/search)
    An example of doing a database query over XHR with a web
    server backed by redis
 - [**session**](examples/session)
    An example of storing information in a session. The session
    is either backed by redis or memory.
 - [**static-files**](examples/static-files)
    An example of serving static files for your web server
 - [**vhost**](examples/vhost)
    An example of handling multiple sub domains as seperate
    applications in a singlue web server
 - [**web-service**](examples/web-service)
    An example JSON REST api web server. Contains API key 
    authentication and error handling

Credit for the application's goes to

 - @visionmedia & express maintainers

### [`hapi`][24] inspired examples

These examples are clones of [`hapi`][24] examples demonstrating
  how to author web apps without frameworks.

 - [**tail**](examples/tail)
    An example of handling async errors in your applications 
    after you have ended the HTTP response
 - [**validate-api**](examples/validate-api)
    An example of how to add validation logic to your HTTP
    route handlers. Both validating query params & the HTTP body

Credit for the application's goes to

 - @spumko & hapi maintainers

### [`connect`][25] inspired examples

These examples are clonse of [`connect`][25] examples demonstrating
  how to author web apps without frameworks.

  - [**basic-auth**](examples/basic-auth)
    An example of handling basic authorization style authentication
    of a web server.
  - [**csrf**](examples/csrf)
    An example of adding csrf security to a form in a web application

Credit for the applicatiosn` goes to
    
 - @visionmedia & connect maintainers

## [Modules][20]

Check out the [modules folder](modules) for an example of small
  modules you can combine to build your own custom "framework"

See the [`package.json`][19] dependencies hash for an example of
  many small modules used in the examples folder of this project.

### For a complete list of [Modules check out the wiki][20]

## Documentation

### [`config-chain`](https://github.com/dominictarr/config-chain)

> I want to load multiple cascading configuration files

Using `config-chain` you can load the configuration for your web 
    application from multiple locations. It also cascades the
    loading so you can load general configuration and overwrite
    it with more specific configuration.

```js
var path = require("path")
var http = require("http")
var cc = require("config-chain")
var optimist = require("optimist")
var NODE_ENV = process.env.NODE_ENV

// optimist is a useful module to parse command line arguments
// if you run `node example.js --port 8000 --host localhost` then
// argv is { port: 8000, host: 'localhost' }
var argv = optimist.argv

// config loads host & port from your config.json file in the
// config folder. The host & port are overwritten by NODE_ENV
// specific config. This is useful for running a test & local
// server without conflicting ports.
// You can also overwrite the configuration with a hardcoded
// path. You can then just have secret configuration files on
// the production box. Lastly we pass in the argv which allows
// us to overwrite configuration values by passing command line
// arguments to our process!
var config = cc(
    argv,
    '/usr/config/my-app/config.json',
    path.join(__dirname, "config", "config." + NODE_ENV + ".json"),
    path.join(__dirname, "config", "config.json")
).store

// port & host are pretty flexibly defined.
http.createServer(function (req, res) {
    res.end("hello world")
}).listen(config.port, config.host)
```

Alternatively by hand:

```js
var path = require("path")
var http = require("http")
var fs = require("fs")
var NODE_ENV = process.env.NODE_ENV

var configOpts = [
    '/usr/config/my-app/config.json',
    path.join(__dirname, "config", "config." + NODE_ENV + ".json"),
    path.join(__dirname, "config", "config.json")
]

var config = {}
// loop trick. Asynchronous for loop.
(function loop(callback) {
    // if we have read all files then done
    if (configOpts.length === 0) {
        return callback()
    }

    // do a thing
    var uri = configOpts.pop()
    fs.readFile(uri, function (err, file) {
        if (err) {
            return callback(err)
        }

        var value = JSON.parse(String(file))
        extend(config, value)
        // when we done the thing get the next value of array
        loop(callback)
    })
}(startServer))

function startServer(err) {
    extend(config, parseArguments(process.argv))

    http.createServer(function (req, res) {
        res.end("hello world")
    }).listen(config.port, config.host)
}


function extend(dest, src) {
    for (var k in src) {
        dest[k] = src[k]
    }
}

function parseArguments(args) {
    var opts = {}, key
    args = args.slice(2)

    args.forEach(function (arg) {
        if (arg.substr(0, 2) === '--') {
            key = arg
        } else {
            opts[key] = arg
        }
    })

    return opts
}
```

### [`cookies`](https://github.com/mikeal/cookies)

> I want to persist data between req/res pairs from the same client

Using `cookies` you cam `get()` and `set()` HTTP cookies on a req / res
  pair. `cookies` also allows you to handle options like signed cookies
  and setting the domain / http only flag. Cookies will stick in the
  http client and will be send again with the next request by that
  client.

```js
var http = require("http")
var cookies = require("cookies")

http.createServer(function (req, res) {
    var cookies = Cookies(req, res)

    // fetch value out of cookie
    var count = Number(cookies.get("count")) || 0
    count++
    // store value in cookie
    cookies.set("count", String(count))

    res.end("you have watched this page " + count + " times")
}).listen(8080)
```

Alternatively by hand:

```js
var http = require("http")

http.createServer(function (req, res) {
    var cookie = req.headers.cookie || ""

    // parse cookie out
    var pairs = cookie.split(";")
    var obj = {}
    pairs.forEach(function (pair) {
        var parts = pair.split("=")
        obj[parts[0].trim()] = parts[1].trim()
    })

    var count = Number(obj.count) || 0
    count++

    // serialize cookie
    res.setHeader("Set-Cookie", "count=" + count)

    res.end("you have watched this page " + count + " times")
}).listen(8080)
```

Note that using `cookies` gives you a more forgiving parser &
    serializer as well as it handling all options & signed 
    cookies.

### [`corsify`](https://github.com/raynos/corsify)

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

Alternatively by hand:

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
    // end point is allowed. You should handle `OPTIONS` seperately
    // from `GET` / `POST` / other headers.
    if (req.method === "OPTIONS") {
        return res.end()
    }

    res.end("API Server! CORS me.")
}).listen(8080)
```

### [`csrf-lite`](https://github.com/isaacs/csrf-lite)

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

Alternatively by hand:

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


### [`filed`](https://github.com/mikeal/filed)

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

Alternatively by hand:

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

### [`send-json`](https://github.com/Raynos/send-data)

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
var sendHtml = require("send-data/html")

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

 - [x] Finish porting express examples
 - [ ] continue porting hapi examples
 - [ ] continue connect examples
 - [ ] Port koajs examples
 - [ ] Port restify examples
 - [ ] Port partial.js examples
 - [ ] Finish documentation
 - [ ] Get community feedback
 - [ ] Author new fresh examples


## Installation

`npm install http-framework`

## Contributors

 - Raynos
 - Matt-Esch
 - maxogden

## MIT Licenced

  [17]: https://github.com/Raynos/http-framework/tree/master/examples
  [18]: https://github.com/visionmedia/express
  [19]: https://github.com/Raynos/http-framework/blob/master/package.json#L19
  [20]: https://github.com/Raynos/http-framework/wiki/Modules
  [21]: https://github.com/Raynos/http-framework#examples
  [22]: https://github.com/Raynos/http-framework#documentation
  [23]: https://github.com/Raynos/http-framework#modules
  [24]: https://github.com/spumko/hapi
  [25]: https://github.com/senchalabs/connect
