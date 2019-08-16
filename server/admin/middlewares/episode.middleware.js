const request = require('request')
const md5 = require('md5')
const fs = require('fs')

function get_id(url) {
    var regExp = /(?:https?:\/\/)?(?:[\w\-]+\.)*(?:drive|docs)\.google\.com\/(?:(?:open|uc)\?(?:[\w\-\%]+=[\w\-\%]*&)*id=|(?:folder|file)\/d\/|\/ccc\?(?:[\w\-\%]+=[\w\-\%]*&)*key=)([\w\-]{28,})/i;
    var match = url.match(regExp);
    if (!match) {
        return false;
    }
    return match[1];
}
module.exports = {
    async validateDrive(req, res, next) {
        try {
            var { source } = req.body
            if (!source) return res.send({ success: false, error: 'Source field must required!!' })
            var source = get_id(source)
            if (!source) return res.send({ success: false, error: 'Source field must a link of google drive!!' })
            res.locals.source = source
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getThumbnail(req, res, next) {
        try {
            var { source } = res.locals
            var name = md5(source)
            request
                .get(`https://drive.google.com/thumbnail?authuser=0&sz=w348-h196-n-k&id=${source}`)
                .on('error', function (err) {
                    return next()
                })
                .pipe(fs.createWriteStream(`../library/upload/thumbnail/${name}.jpg`))
                res.locals.thumbnail = `/library/upload/thumbnail/${name}.jpg`
                return next()
        } catch (err) {
            return next()
        }
    }
}