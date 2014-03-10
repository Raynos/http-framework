# http-framework

A web framework based purely on `require('http')`

## Motivation

`require('http')` is a web framework. All you need are a few
  small modules that do one thing well when you are building your
  web application route handlers.

This module aggregates and documents (with examples) a selection
  of small modules that can be used to achieve this goal.

It's recommended you check out the:

  - [the wiki of modules][23]
  - [the documentation][22]
  - [the examples][21]

I do not recommend you use this "framework". You should check
  out the small modules and use them directly. Use the list of
  examples here for inspiration.

http-framework is an OPEN Open Source Project, see the Contributing 
  section to find out what this means.

## [Modules][20]

Check out the [modules folder](modules) for an example of small
  modules you can combine to build your own custom "framework"

See the [`package.json`][19] dependencies hash for an example of
  many small modules used in the examples folder of this project.

### For a complete list of [Modules check out the wiki][20]

## [Documentation][26]

### [HTTP workshop][27]

For a tutorial / workshop see [http-works][27]

### module docs

 - [config-chain](documents/config-chain.md)
 - [cookies](documents/cookies.md)
 - [corsify](documents/corsify.md)
 - [csrf-lite](documents/csrf-lite.md)
 - [filed](documents/filed.md)
 - [form-body](documents/form-body.md)
 - [send-json](documents/send-json.md)
 - [send-html](documents/send-html.md)

### rest of the modules

```js
// TODO
```

For now see the [examples folder][17]

## [Examples][17]

### [`express`][18] inspired examples

These examples are clones of [`express`][18] examples demonstrating
  how to author web apps without frameworks.

 - [**auth**](examples/auth)
    An example demonstrating how to login and authenticate users
 - [**auth-helpers**](examples/auth-helpers)
    An example demonstrating how you can restrict certain routes in your
    apps to only be accessed by certain types of users
 - [**content-negotiation**](examples/content-negotiation)
    An example demonstrating how you can return different types of
    content based on what the user asks for in his Accept header.
 - [**cookie-sessions**](examples/cookie-sessions)
    An example of storing session information in a users cookie
 - [**cookies**](examples/cookies)
    An example of setting a cookie to track a user
 - [**cors**](examples/cors)
    An example of adding cors support to your HTTP server
 - [**downloads**](examples/downloads)
    An example of allowing users to download files from your server
 - [**error**](examples/error)
    An example of handling errors in your HTTP server
 - [**error-pages**](examples/error-pages)
    An example of rendering custom 500 and 404 pages in your web
    server
 - [**expose-data-to-client**](examples/expose-data-to-client)
    An example of putting server side state into your template
    so that it can be accessed from browser javascript
 - [**hello-world**](examples/hello-world)
    A simple hello world example
 - [**multipart**](examples/multipart)
    An example demonstrating file uploads and saving them to
    disk temporarily.
 - [**mvc**](examples/mvc)
    An over engineered example of how to structure a slightly
    larger web application. Includes configuration, modularity
    and databases. Take ideas from it, please do not copy paste it
 - [**online**](examples/online)
    An example of using redis and the `online` module to track
    user presence
 - [**route-map**](examples/route-map)
    An example of a `map` utility function that can be used to
    structure your routes differently. This demonstrates you can
    do whatever you want, if you like it, do it.
 - [**route-seperation**](examples/route-seperation)
    An example of spreading your route handlers over multiple
    files. 
 - [**search**](examples/search)
    An example of doing a database query over XHR with a web
    server backed by redis
 - [**session**](examples/session)
    An example of storing information in a session. The session
    is either backed by redis or memory.
 - [**static-files**](examples/static-files)
    An example of serving static files for your web server
 - [**vhost**](examples/vhost)
    An example of handling multiple sub domains as seperate
    applications in a singlue web server
 - [**web-service**](examples/web-service)
    An example JSON REST api web server. Contains API key 
    authentication and error handling

Credit for the application's goes to

 - @visionmedia & express maintainers

### [`hapi`][24] inspired examples

These examples are clones of [`hapi`][24] examples demonstrating
  how to author web apps without frameworks.

 - [**tail**](examples/tail)
    An example of handling async errors in your applications 
    after you have ended the HTTP response
 - [**validate-api**](examples/validate-api)
    An example of how to add validation logic to your HTTP
    route handlers. Both validating query params & the HTTP body

Credit for the application's goes to

 - @spumko & hapi maintainers

### [`connect`][25] inspired examples

These examples are clones of [`connect`][25] examples demonstrating
  how to author web apps without frameworks.

  - [**basic-auth**](examples/basic-auth)
    An example of handling basic authorization style authentication
    of a web server.
  - [**csrf**](examples/csrf)
    An example of adding csrf security to a form in a web application

Credit for the applicatiosn` goes to
    
 - @visionmedia & connect maintainers

## Todo

 - [x] Finish porting express examples
 - [ ] continue porting hapi examples
 - [ ] continue connect examples
 - [ ] Port koajs examples
 - [ ] Port restify examples
 - [ ] Port partial.js examples
 - [ ] Finish documentation
 - [ ] Get community feedback
 - [ ] Author new fresh examples


## Installation

`npm install http-framework`

## Contributors

 - Raynos
 - Matt-Esch
 - maxogden

## MIT Licenced

  [17]: https://github.com/Raynos/http-framework/tree/master/examples
  [18]: https://github.com/visionmedia/express
  [19]: https://github.com/Raynos/http-framework/blob/master/package.json#L19
  [20]: https://github.com/Raynos/http-framework/wiki/Modules
  [21]: https://github.com/Raynos/http-framework#examples
  [22]: https://github.com/Raynos/http-framework#documentation
  [23]: https://github.com/Raynos/http-framework#modules
  [24]: https://github.com/spumko/hapi
  [25]: https://github.com/senchalabs/connect
  [26]: https://github.com/Raynos/http-framework/tree/master/documents
  [27]: https://github.com/Raynos/http-works
