var test = require("tape")

var httpFramework = require("../index")

test("httpFramework is a function", function (assert) {
    assert.equal(typeof httpFramework, "function")
    assert.end()
})
