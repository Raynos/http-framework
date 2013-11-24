var METHODS = ["GET", "DELETE", "POST", "PUT"]

// this should be a module on npm
module.exports = map

function map(router, hash, route) {
    route = route || ""
    var keys = Object.keys(hash)
    keys.forEach(function (routeOrMethod) {
        if (METHODS.indexOf(routeOrMethod) !== -1) {
            return
        }

        var value = hash[routeOrMethod]
        var newRoute = route + routeOrMethod
        router.addRoute(newRoute, value)
        map(router, value, newRoute)
    })
}
