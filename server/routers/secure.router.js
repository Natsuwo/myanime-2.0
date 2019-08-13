const fs = require('fs')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const route = Router()

function createKey(key) {
    const ONE_HOUR = 60 * 60 * 1
    return jwt.sign(key, process.env.JWTSECRET, {
        expiresIn: ONE_HOUR
    })
}

route.get('/v2/secure', (req, res) => {
    try {
        var { securekey } = req.headers
        if (securekey !== process.env.SECUREKEY) {
            throw Error('Access denied.')
        }
        var key = createKey({ secure: Date.now() })
        oldKey = fs.readFileSync('./items/authkey.json', { encoding: 'utf8' })
        if (oldKey.length > 2) {
            var oldKey = JSON.parse(oldKey)
            var verify = jwt.verify(oldKey.authKey, process.env.JWTSECRET)
            if (Date.now() < verify.exp * 1000) {
                return res.send()
            } 
        }
        fs.writeFileSync("./items/authkey.json", JSON.stringify({ authKey: key }))
        return res.end()
    } catch (err) {
        res.send({ succes: false, error: err.message })
    }
})

module.exports = route