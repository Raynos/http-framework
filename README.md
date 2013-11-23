# http-framework

A web framework based purely on `require('http')`

## Motivation

`require('http')` is a web framework. All you need to add a few
  small modules that do one thing well when your building your
  web application route handlers.

This module aggregates and documents (with examples) a selection
  of small modules that can be used to achieve this goal.

I do not recommend you use this "framework". You should check
  out the small modules and use them directly. Use the list of
  examples here for inspiration.

## Examples

The examples are clones of [`express`][18] examples demonstrating
  how to author web apps without frameworks.

Credit for the applications goes to

 - @visionmedia & express maintainers

see [the examples folder][17]

## Todo

 - [ ] Finish porting express examples
 - [ ] Port connect examples
 - [ ] Port hapi examples
 - [ ] Get community feedback
 - [ ] Author new fresh examples

## Modules

 - [`send-data`][1]
 - [`body`][2]
 - [`routes`][3]
 - [`mapleTree`][4]
 - [`http-methods`][5]
 - [`request`][6]
 - [`cookies`][7]
 - [`redsess`][8]
 - [`level-session`][9]
 - [`st`][10]
 - [`config-chain`][11]
 - [`redirecter`][12]
 - [`serve-browserify`][13]
 - [`npm-css`][14]
 - [`npm-less`][15]
 - [`routes-router`][16]

## Installation

`npm install http-framework`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://github.com/Raynos/send-data
  [2]: https://github.com/Raynos/body
  [3]: https://github.com/aaronblohowiak/routes.js
  [4]: https://github.com/saambarati/mapleTree
  [5]: https://github.com/Raynos/http-methods
  [6]: https://github.com/mikeal/request
  [7]: https://github.com/jed/cookies
  [8]: https://github.com/isaacs/redsess
  [9]: https://github.com/rvagg/level-session
  [10]: https://github.com/isaacs/st
  [11]: https://github.com/dominictarr/config-chain
  [12]: https://github.com/Raynos/redirecter
  [13]: https://github.com/Raynos/serve-browserify
  [14]: https://github.com/defunctzombie/npm-css
  [15]: https://github.com/Raynos/npm-less
  [16]: https://github.com/Raynos/routes-router
  [17]: https://github.com/Raynos/http-framework/tree/master/examples
  [18]: https://github.com/visionmedia/express
