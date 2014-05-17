var test = require("tape")
  , http = require("http")
  , options = {
      host: "localhost",
      port: 3000,
      path: "/"
    }

// test if the favicon was served
test("hello-world", function(t) {
  t.plan(2)
  http.get(options, function(res) {
    t.deepEqual(res.statusCode, 200)
    res.on("data", function(d) {
      t.deepEqual(d.toString(), "Hello World")
    })
  }).on("error", function(e) {
    console.log(e.message)
  })
})
