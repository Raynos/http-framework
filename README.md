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

## Examples

The examples are clones of [`express`][18] examples demonstrating
  how to author web apps without frameworks.

Credit for the applications goes to

 - @visionmedia & express maintainers

see [the examples folder][17]

## Modules

See the [`package.json`][19] dependencies hash for an example of
  many small modules used in the examples folder of this project.

For a complete list of [Modules check out the wiki][20]

## Documentation

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
    var payload = new Buffer(JSON.stringify({
        sending: "json"
    }))
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
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

var page = fs.readFileSync(__dirname + "/static/index.html")

http.createServer(function (req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
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
