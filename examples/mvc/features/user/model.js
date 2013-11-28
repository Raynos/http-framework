var SubLevel = require("level-sublevel")
var uuid = require("uuid")

module.exports = UserModel

function UserModel(db) {
    db = SubLevel(db)

    var users = db.sublevel("users")
    // naughty. two models talk to one database section
    // really should refactor with dependencies but that requires
    // managing with git or npm
    var pets = db.sublevel("pets")

    return {
        get: get,
        create: create,
        getAll: getAll,
        addPet: addPet,
        setName: setName
    }

    function get(id, callback) {
        users.get(id, function (err, result) {
            if (err && err.notFound) {
                return callback(null, null)
            }

            callback(err, result)
        })
    }

    function getAll(callback) {
        var list = []
        var stream = users.createReadStream()

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

    function create(user, callback) {
        users.put(user.id, user, callback)
    }

    function addPet(userId, petName, callback) {
        users.get(userId, function (err, user) {
            if (err) {
                return callback(err)
            }

            var pet = { name: petName, id: uuid() }
            pets.put(pet.id, pet, function (err) {
                if (err) {
                    return callback(err)
                }

                user.pets = user.pets || []
                user.pets.push(pet)

                users.put(user.id, user, callback)
            })
        })
    }
}
