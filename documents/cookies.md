# [`cookies`](https://github.com/mikeal/cookies)

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

## Alternatively by hand:

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
