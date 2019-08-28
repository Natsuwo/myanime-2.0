const { Router } = require('express')
const multer = require('multer')
const route = Router()
const { get, post, getUpdate, postUpdate, removeTerm, removeAnime, crawlAnime } = require('../controllers/anime.controller')
const { checkSecure, isUserLogin } = require('../validate/secure.validate')
const { uploadImage } = require('../middlewares/upimg.middleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `../library/upload/anime/${file.fieldname}/`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage })
var fields = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'cover', maxCount: 1 }])

route.get('/anime/get', checkSecure, isUserLogin, get)
route.get('/anime/update', checkSecure, isUserLogin, getUpdate)
route.put('/anime/update', checkSecure, isUserLogin, fields, postUpdate)
route.post('/anime/post', checkSecure, isUserLogin, fields, post, uploadImage)
route.post('/anime/crawl', checkSecure, isUserLogin, crawlAnime)
route.post('/anime/remove-term', checkSecure, isUserLogin, removeTerm)
route.post('/anime/remove-anime', checkSecure, isUserLogin, removeAnime)

module.exports = route