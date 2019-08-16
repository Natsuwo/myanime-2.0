const { Router } = require('express')
const multer = require('multer')
const route = Router()
const { get, post, getUpdate, postUpdate, removeTerm, removeAnime } = require('../controllers/anime.controller')

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

route.get('/anime/get', get)
route.get('/anime/update', getUpdate)
route.put('/anime/update', fields, postUpdate)
route.post('/anime/post', fields, post)
route.post('/anime/remove-term', removeTerm)
route.post('/anime/remove-anime', removeAnime)

module.exports = route