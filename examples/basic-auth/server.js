// based on https://github.com/thisandagain/basic

var basic    = require('basic'),
    http     = require('http');

var auth    = basic(function (user, pass, callback) {
    if (user === 'let' && pass === 'me in') return callback(null);
    callback(401);
});

http.createServer(function (req, res) {
    auth(req, res, function (err) {
        var head = (err) ? {'WWW-Authenticate': 'Basic realm="Secure Area"'} : {};
        res.writeHead(err || 200, head);
        if (err) res.end(err.toString() + ' Not Authorized')
        res.end('You are authenticated!');
    });
}).listen(8000);

console.log('open http://localhost:8000, log in with username "let" and password "me in"')