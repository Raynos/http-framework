var http = require("http")
var console = require("console")
var sendText = require("send-data")
var setTimeout = require("timers").setTimeout

function Tail(emitter, data) {
    return function () {
        emitter.emit("tail", data)
    }
}

var server = http.createServer(function (req, res) {
    var tail1 = Tail(server, {
        request: req,
        name: "tail 1"
    })

    setTimeout(function () {
        tail1()
    }, 5000)

    var tail2 = Tail(server, {
        request: req,
        name: "tail 2"
    })

    setTimeout(function () {
        tail2()
    }, 2000)

    sendText(req, res, "Success!\n")
})

server.on("tail", function (data) {
    console.log("Wag the dog", data)
})

server.listen("3000", function () {
    console.log("Listening on port 3000")
})
