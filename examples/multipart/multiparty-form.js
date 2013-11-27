var Form = require("multiparty").Form

module.exports = MultipartyForm

// This should be a module on npm
function MultipartyForm(req, res, opts, cb) {
    var form = new Form()
    var fields = {}
    var files = {}
    var result = { fields: fields, files: files }
    var counter = 1
    form.parse(req)

    // any normal non file form input is considered a field
    // if you had <input name='title' value='foo' /> then
    // key would be 'title' and value would be 'foo'
    form.on("field", function (key, value) {
        // BUG: do not handle case where name appears multiple
        // times in a form.
        fields[key] = value
    })

    // a part is any piece of data in a multipart upload.
    // here we only handle the file ones. `part` in this case
    // is a readablestream
    form.on("part", function (part) {
        // if filename is null then this is a 'field'
        // we already handle it in the 'field' listener
        if (part.filename === null) {
            return
        }

        // increment counter. This means we wait for all parts
        counter++

        opts.handlePart.call(result, part, function (err, result) {
            if (err) {
                return cb(err)
            }

            // BUG: do not handle case where name appears multiple
            // times in a form
            files[part.name] = result
            finish()
        })
    })

    form.once("error", cb)
    form.once("close", finish)

    function finish() {
        // wait for all parts to finish
        if (--counter === 0) {
            // pass a hash of fields and a hash of files
            // fields are strings and files are readable streams
            cb(null, { fields: fields, files: files })
        }
    }
}
