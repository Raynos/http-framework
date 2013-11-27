var SubLevel = require("level-sublevel")

module.exports = UserModel

function UserModel(db) {
    db = SubLevel(db)

    var users = db.sublevel("users")

    return {
        get: get,
        getAll: getAll,
        setName: setName
    }

    function get(id, callback) {
        users.get(id, callback)
    }

    function getAll(callback) {
        var list = []
        var stream = db.createReadStream()

        stream
            .on("data", onData)
            .once("error", callback)
            .once("end", function onEnd() {
                stream.removeListener("data", onData)

                callback(null, list)
            })

        function onData(chunk) {
            list.push(chunk.value)
        }
    }

    function setName(id, name, callback) {
        users.get(id, function (err, user) {
            if (err) {
                return callback(err)
            }

            user.name = name

            users.put(id, user, function (err) {
                if (err) {
                    return callback(err)
                }

                callback(null, user)
            })
        })
    }
}
