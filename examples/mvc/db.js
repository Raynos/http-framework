var level = require("level")
var SubLevel = require("level-sublevel")

module.exports = Db

// Create a database based on our configuration
// we keep the production & local database seperate
// also set encoding to json so we can just store objects
function Db(config) {
    var db = level(config.dbPath, {
        valueEncoding: "json",
        keyEncoding: "json"
    })

    initializeDb(db)

    return db
}

// put fake data in the database!
function initializeDb(db) {
    var pets = []

    pets.push({ name: "Tobi", id: "0" })
    pets.push({ name: "Loki", id: "1" })
    pets.push({ name: "Jane", id: "2" })
    pets.push({ name: "Raul", id: "3" })

    var users = []

    users.push({ name: "TJ", pets: [pets[0], pets[1], pets[2]], id: "0"  })
    users.push({ name: "Guillermo", pets: [pets[3]], id: "1" })
    users.push({ name: "Nathan", pets: [], id: "2" })

    db = SubLevel(db)

    var usersDb = db.sublevel("users")
    var petsDb = db.sublevel("pets")

    petsDb.put(pets[0].id, pets[0])
    petsDb.put(pets[1].id, pets[1])
    petsDb.put(pets[2].id, pets[2])
    petsDb.put(pets[3].id, pets[3])

    usersDb.put(users[0].id, users[0])
    usersDb.put(users[1].id, users[1])
    usersDb.put(users[2].id, users[2])
}
