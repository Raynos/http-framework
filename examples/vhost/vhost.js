// heavily based on https://github.com/senchalabs/connect/blob/master/lib/middleware/vhost.js
module.exports = vhost

// this should be a module on npm!
function vhost(hosts) {
    var pairs = Object.keys(hosts).map(function (hostName) {
        var handler = hosts[hostName]
        var regexp = new RegExp("^" + hostName
            .replace(/[^*\w]/g, "\\$&")
            .replace(/[*]/g, "(?:.*?)") + "$", "i")

        return [regexp, handler]
    })

    return function (req, res, opts, cb) {
        if (!req.headers.host) {
            return cb(new Error("no host header found"))
        }

        var host = req.headers.host.split(":")[0]
        var handled = pairs.some(function (pair) {
            var regexp = pair[0]
            var handler = pair[1]

            var match = regexp.test(host)
            if (!match) {
                return false
            }

            handler(req, res)
            return true
        })

        if (!handled) {
            return cb(new Error("could not find a vhost redirect match"))
        }
    }
}
