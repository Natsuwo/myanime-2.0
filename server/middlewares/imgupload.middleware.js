const fs = require('fs')
const axios = require('axios')
const { Attachment } = require('discord.js')
const { discordLogin } = require('../helpers/discord.helper')
const tinify = require("tinify")
const channel = '624929128763621388'
var client;
discordLogin().then(res => {
    client = res
})

module.exports = {
    async uploadImage(req, res, next) {
        try {
            var images = req.files
            if (!images) return next()
            var files = {}
            var discord = fs.readFileSync('./discord.json')
            var tinykey = fs.readFileSync('./tinify.json', { encoding: "utf8" })
            var { token } = JSON.parse(discord)
            tinykey = JSON.parse(tinykey)
            var rankey = tinykey[Math.floor(Math.random() * tinykey.length)]
            tinify.key = rankey
            axios.defaults.headers.common['Authorization'] = 'Bot ' + token
            for (var image of images) {
                var buffer = image.buffer
                await tinify.fromBuffer(buffer).toBuffer(async (err, resultData) => {
                    if (!err) {
                        buffer = resultData
                        var name = image.fieldname
                        var fileName = image.originalname
                        var attach = new Attachment(buffer, fileName)
                        var resp = await client.channels.get(channel).send(attach).catch(err => {
                            files[name] = '/default-avatar.png'
                        })
                        var get = await axios.get('https://discordapp.com/api/channels/' + channel + '/messages/' + resp.id).catch(err => {
                            files[name] = '/default-avatar.png'
                        })
                        var link = get.data.attachments[0].url
                        files[name] = link
                        res.locals.files = files
                        return next()
                    } else {
                        throw err.message
                    }
                })
            }

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async tryLogin(req, res, next) {
        try {
            client = await discordLogin()
            res.send({ success: true, message: "Ok" })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}