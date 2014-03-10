# [`config-chain`](https://github.com/dominictarr/config-chain)

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

## Alternatively by hand:

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
