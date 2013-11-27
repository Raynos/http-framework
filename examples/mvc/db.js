var level = require("level")

module.exports = Db

// Create a database based on our configuration
// we keep the production & local database seperate
// also set encoding to json so we can just store objects
function Db(config) {
    return level(config.dbPath, {
        valueEncoding: "json",
        keyEncoding: "json"
    })
}
