const fs = require('fs')
const UserMeta = require('./models/UserMeta')
const Anime = require('./models/Anime')
const Noti = require('./models/Noti')
var filePath = '../newupload.json'
fs.watchFile(filePath, async () => {
    try {
        var file = fs.readFileSync(filePath, 'utf8')
        var newFile = JSON.parse(file)
        var newEp = newFile[0]
        var parent_id = newEp.anime_id
        var meta_key = "follow"
        var usermeta = await UserMeta
            .findOne({ parent_id, meta_key, $or: [{ meta_value: "watching" }, { meta_value: "considering" }] })
        if (usermeta) {
            var user_id = usermeta.user_id
            var anime_id = parent_id
            var episode_id = newEp.episode_id
            var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title thumbnail')
            var cover = anime.thumbnail
            var message = `Anime: <strong>${anime.title}</strong> have a new episode uploaded.`
            var thumbnail = newEp.thumbnail
            var isHas = await Noti.findOne({ user_id, anime_id, episode_id })
            if (!isHas) {
                await Noti.create({ user_id, anime_id, episode_id, message, thumbnail, cover })
            }
            var total = await Noti.countDocuments({ user_id })
            if (total > 10) {
                await Noti.deleteOne({ user_id })
            }
        }
    } catch (err) {
        console.log(err.message)
    }
})