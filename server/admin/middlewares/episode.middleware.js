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
    async beforeAddMulti(req, res, next) {
        try {
            var { anime_id, audio, fansub, subtitle, type } = req.body.form
            if (!anime_id || !audio || !fansub || !subtitle || !type) throw Error('Missing field(s), please check again.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getThumbnail(req, res, next) {
        try {
            var { thumbnail } = req.body
            var { source } = res.locals
            if (!thumbnail) { 
                res.locals.thumbnail = `https://drive.google.com/thumbnail?authuser=0&sz=w348-h196-n-k&id=${source}`
                return next()
            }
            res.locals.thumbnail = thumbnail
            return next()
        } catch (err) {
            console.log(err)
            return next()
        }
    },
    async checkThumb(req, res, next) {
        try {
            var { source } = req.body
            var name = md5(source)
            await request
                .get(`https://drive.google.com/thumbnail?authuser=0&sz=w348-h196-n-k&id=${source}`, (err, head) => {
                    if (!head.headers['content-length']) {
                        return next()
                    }
                })
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