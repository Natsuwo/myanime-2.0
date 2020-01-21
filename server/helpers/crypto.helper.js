const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const key = process.env.CRYPTOKEY

module.exports = {
    encrypt(text) {
        var cipher = crypto.createCipher(algorithm, Buffer.from(key))
        var encrypted = cipher.update(text, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        // let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
        // let encrypted = cipher.update(text)
        // encrypted = Buffer.concat([encrypted, cipher.final()])
        // return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') }
        return encrypted
    },
    decrypt(text) {
        var decipher = crypto.createDecipher(algorithm, Buffer.from(key));
        var decrypted = decipher.update(text, 'hex', 'utf8')
        decrypted += decipher.final('utf8');
        // let iv = Buffer.from(text.iv, 'hex')
        // let encryptedText = Buffer.from(text.encryptedData, 'hex')
        // let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
        // let decrypted = decipher.update(encryptedText)
        // decrypted = Buffer.concat([decrypted, decipher.final()])
        // return decrypted.toString()
        return decrypted
    }
}