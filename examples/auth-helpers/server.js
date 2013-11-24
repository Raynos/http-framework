// based on https://github.com/visionmedia/express/blob/master/examples/route-middleware/index.js

var http = require("http")
var Router = require("routes-router")
var Session = require("generic-session")
var MemoryStore = require("generic-session").MemoryStore
var sendText = require("send-data")
var redirect = require("redirecter")
var TypedError = require("error/typed")

var store = MemoryStore()
var app = Router()

// Example requests:
//     curl http://localhost:3000/login
//     curl http://localhost:3000/user/0
//     curl http://localhost:3000/user/0/edit
//     curl http://localhost:3000/user/1
//     curl http://localhost:3000/user/1/edit
//          (unauthorized since this is not you)
//     curl -X DELETE http://localhost:3000/user/0 
//          (unauthorized since you are not an admin)

// Dummy users
var users = [
    { id: 0, name: "tj", email: "tj@vision-media.ca", role: "member" },
    { id: 1, name: "ciaran", email: "ciaranj@gmail.com", role: "member" },
    {
        id: 2,
        name: "aaron",
        email: "aaron.heckmann+github@gmail.com",
        role: "admin"
    }
]

var USER_NOT_FOUND = TypedError({
    statusCode: 404,
    message: "Failed to load user %s"
})

var UNAUTHORIZED = TypedError({
    statusCode: 403,
    message: "Unauthorized"
})

// you would fetch your user from the db here
function loadUser(id, callback) {
    var user = users[id]
    if (!user) {
        return callback(USER_NOT_FOUND(id))
    }

    callback(null, user)
}

function restrictToSelf(req, res, user, callback) {
    var session = Session(req, res, store)
    // fetch the current user from the session
    session.get("user", function (err, authedUser) {
        if (err) {
            return callback(err)
        }

        // if the session user is the user we are viewing then
        // there is no problem.
        if (user.id === (authedUser && authedUser.id)) {
            return callback()
        }

        // if it's not we can pass up an unauthorizederorr
        // which can be handled specially in your error handler
        callback(UNAUTHORIZED())
    })
}

function restrictTo(req, res, role, callback) {
    var session = Session(req, res, store)
    session.get("user", function (err, authedUser) {
        if (err) {
            return callback(err)
        }

        if (authedUser.role !== role) {
            return callback(UNAUTHORIZED())
        }

        callback()
    })
}

// faux login route. If you hit it we are going to store your
// user in the session.
app.addRoute("/login", function (req, res, opts, cb) {
    var session = Session(req, res, store)
    session.set("user", users["0"], function (err) {
        if (err) {
            return cb(err)
        }

        sendText(req, res, "Login ok")
    })
})

app.addRoute("/", function (req, res) {
    redirect(req, res, "/user/0")
})

// this route is verbose because of callbacks. It's cleaner with flow control
/*
app.addRoute("/user/:id", {
    "GET": function (req, res, opts) {
        var user = yield loadUser.bind(null, opts.id)
        sendText(req, res, "Viewing user " + user.name)
    },
    "DELETE": function (req, res, opts) {
        yield restrictTo.bind(null, req, res, "admin")
        var user = yield loadUser.bind(null, opts.id)
        sendText("Deleted user " + user.name)
    }
})
*/
app.addRoute("/user/:id", {
    "GET": function (req, res, opts, cb) {
        loadUser(opts.id, function (err, user) {
            if (err) {
                return cb(err)
            }

            sendText(req, res, "Viewing user " + user.name)
        })
    },
    "DELETE": function (req, res, opts, cb) {
        restrictTo(req, res, "admin", function (err) {
            if (err) {
                return cb(err)
            }

            loadUser(opts.id, function (err, user) {
                if (err) {
                    return cb(err)
                }

                sendText("Deleted user " + user.name)
            })
        })
    }
})

app.addRoute("/user/:id/edit", function (req, res, opts, cb) {
    loadUser(opts.id, function (err, user) {
        if (err) {
            return cb(err)
        }

        restrictToSelf(req, res, user, function (err) {
            if (err) {
                return cb(err)
            }

            sendText(req, res, "Editing user " + user.name)
        })
    })
})

var server = http.createServer(app)
server.listen(3000)
console.log("auth helpers server listen on port 3000")
