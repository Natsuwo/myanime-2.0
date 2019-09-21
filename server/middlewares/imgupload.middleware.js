const axios = require('axios')
axios.defaults.headers.common['Authorization'] = 'Bot ' + process.env.TOKEN_DISCORD
const { Client, Attachment } = require('discord.js')
const token = process.env.TOKEN_DISCORD
const client = new Client()
const channel = '624929128763621388'
client.login(token).catch(err => {
    console.log(err.message)
})
client.on('error', (err) => console.error(err.message))
client.on('ready', () => {
    console.log('Bot ready!')
})

module.exports = {
    async uploadImage(req, res, next) {
        try {
            var images = req.files
            if (!images) return next()
            var files = {}
            for (var image of images) {
                var buffer = image.buffer
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
            }
            res.locals.files = files
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}