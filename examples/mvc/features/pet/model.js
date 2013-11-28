var SubLevel = require("level-sublevel")

module.exports = PetModel

function PetModel(db) {
    db = SubLevel(db)

    var users = db.sublevel("users")
    var pets = db.sublevel("pets")

    return {
        get: get,
        create: create,
        getAll: getAll,
        setName: setName
    }

    function get(id, callback) {
        pets.get(id, function (err, result) {
            if (err && err.notFound) {
                return callback(null, null)
            }

            callback(err, result)
        })
    }

    function getAll(callback) {
        var list = []
        var stream = pets.createReadStream()

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
        pets.get(id, function (err, pet) {
            if (err) {
                return callback(err)
            }

            pet.name = name

            pets.put(id, pet, function (err) {
                if (err) {
                    return callback(err)
                }

                //TODO. Fix the user records we denormalized
                callback(null, pet)
            })
        })
    }

    function create(pet, callback) {
        pets.put(pet.id, pet, callback)
    }
}
