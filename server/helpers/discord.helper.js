const fs = require('fs')

module.exports = {
    async discordLogin() {
        var { Client } = require('discord.js')
        var token = fs.readFileSync('./discord.json', { encoding: 'utf8' })
        var { token } = JSON.parse(token)
        var client = new Client()
        client.login(token).catch(err => {
            console.log(err.message)
            return false
        })
        client.on('ready', () => {
            console.log('Bot ready!')
        })
        return client
    }
}