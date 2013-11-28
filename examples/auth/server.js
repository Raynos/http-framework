// based on https://github.com/visionmedia/express/blob/master/examples/auth/app.js
var http = require("http")
var Router = require("routes-router")
var pwd = require("pwd")
var redirect = require("redirecter")
var Session = require("generic-session")
var MemoryStore = require("generic-session").MemoryStore
var sendHtml = require("send-data/html")
var formBody = require("body/form")

var template = require("./template.js")

var store = MemoryStore()
var app = Router()

// dummy users database
var users = {
    tj: { name: "tj" }
}

// hash a user password. This generatrs a salt & hash
pwd.hash("foobar", function (err, salt, hash) {
    if (err) {
        throw err
    }

    users.tj.salt = salt
    users.tj.hash = String(hash)
})

// authentication logic based on our mock database
function authenticate(name, password, callback) {
    var user = users[name]
    // check whether user eists
    if (!user) {
        return callback(new Error("cannot find user"))
    }

    // hash the password with the users salt. If the hash
    // matches what is on the user then it's good
    pwd.hash(password, user.salt, function (err, hash) {
        if (err) {
            return callback(err)
        }

        // hashes returned by pwd.hash are buffers so cast them to strings
        if (String(hash) === user.hash) {
            return callback(null, user)
        }

        callback(new Error("invalid password"))
    })
}

// restrict intercepts your route handler and runs some session logic
// before it. It will then just take your route handler over completely
// if the user doesnt exist otherwise it will call out to your route handler
function restrict(handler) {
    return function (req, res, opts, callback) {
        var session = Session(req, res, store)
        session.get("user", function (err, user) {
            if (err) {
                return callback(err)
            }

            if (!user) {
                return session.set("message", {
                    text: "Access denied!",
                    type: "error"
                }, function (err) {
                    if (err) {
                        return callback(err)
                    }

                    redirect(req, res, "/login")
                })
            }

            handler(req, res, opts, callback)
        })
    }
}

app.addRoute("/", function (req, res) {
    redirect(req, res, "/login")
})

app.addRoute("/restricted", restrict(function (req, res) {
    sendHtml(req, res, "Wahoo! restricted area, click to " +
        "<a href='/logout'>logout</a>")
}))

app.addRoute("/logout", function (req, res, opts, callback) {
    var session = Session(req, res, store)
    // destroy(cb) will delete the entire session for this user.
    // this means a new one will be created next time
    session.destroy(function (err) {
        if (err) {
            return callback(err)
        }

        redirect(req, res, "/")
    })
})

app.addRoute("/login", {
    GET: function (req, res, opts, callback) {
        var session = Session(req, res, store)
        // fetch the message out of the session. if a previous
        // POST failed or succeeded we will generate a message
        session.get("message", function (err, doc) {
            if (err) {
                return callback(err)
            }

            var message = ""
            if (doc && doc.type === "error") {
                message = "<p class='msg error'>" + doc.text + "</p>"
            }
            if (doc && doc.type === "success") {
                message = "<p class='msg success'>" + doc.text + "</p>"
            }

            // we are rendering the message so make sure to remove it
            // from the session otherwise it will be seen twice
            session.del("message", function (err) {
                if (err) {
                    return callback(err)
                }

                sendHtml(req, res, template({ message: message }))
            })
        })
    },
    POST: function (req, res, opts, callback) {
        formBody(req, res, function (err, body) {
            if (err) {
                return callback(err)
            }

            authenticate(body.username, body.password, function (err, user) {
                var session = Session(req, res, store)

                // if no user matches authentication then set error message
                // for next GET to login
                if (err || !user) {
                    return session.set("message", {
                        type: "error",
                        text: "Authentication failed, pleace check your " +
                            " username and password." +
                            " (user 'tj' and 'foobar')"
                    }, function (err) {
                        if (err) {
                            return callback(err)
                        }

                        redirect(req, res, "/login")
                    })
                }

                // succesfull user authentication. we should delete any
                // existing session
                session.del(function (err) {
                    if (err) {
                        return callback(err)
                    }

                    // then set the user
                    session.set("user", user, function (err) {
                        if (err) {
                            return callback(err)
                        }

                        // and a success message
                        session.set("message", {
                            type: "success",
                            text: "Authenticated as " + user.name +
                                " click to <a href='/logout'>logout</a>. " +
                                " You may now access " +
                                "<a href='/restricted'>/restricted</a>"
                        }, function (err) {
                            if (err) {
                                return callback(err)
                            }

                            redirect(req, res, "/login")
                        })
                    })
                })
            })
        })
    }
})

var server = http.createServer(app)
server.listen(3000)
console.log("example auth server listening on port 3000")
