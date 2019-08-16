const User = require('../../models/User')
const Anime = require('../../models/Anime')
const Episode = require('../../models/Episode')
const Comment = require('../../models/Comment')

module.exports = {
    async dashBoard(req, res) {
        try {
            var animes = await Anime.countDocuments()
            var episodes = await Episode.countDocuments()
            var comments = await Comment.countDocuments()
            var users = await User.countDocuments()
            res.send({ success: true, data: { animes, episodes, comments, users } })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}