// based on https://github.com/expressjs/serve-favicon#vanilla-http-server
// middleware for serving a favicon using vanilla http
var http = require('http')
  , path = require('path')
  , favicon = require('serve-favicon')

var _favicon = favicon(path.join(__dirname,'/favicon.ico'))

http.createServer(function(req, res) {
  _favicon(req, res, function(err) {
    if (err) {
      res.statusCode = 500
      res.end('error')
      return
    }
    res.end('favicon example')
  })
}).listen(3000, function() {
  console.log('listening on port: 3000')
})
