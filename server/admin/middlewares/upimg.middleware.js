const fs = require('fs')
const md5 = require('md5')
const request = require('request')
const GPhotos = require('upload-gphotos').default
const Anime = require('../../models/Anime')
const Episode = require('../../models/Episode')

const gphotos = new GPhotos({
    username: 'natsuwaya2',
    password: 'wayafansub'
});

module.exports = {
    async uploadImage(req, res, next) {
        try {
            var { data } = req.body
            var { anime_id } = res.locals
            var { thumbnail } = JSON.parse(data)
            if (thumbnail && anime_id) {
                var name = md5(thumbnail)
                var path = `../library/upload/gphoto/${name}.jpg`
                request
                    .get(`${thumbnail}`)
                    .pipe(fs.createWriteStream(path))
                await gphotos.login();
                var album = await gphotos.searchOrCreateAlbum('Anime Cover');
                var thumbnail = await gphotos.upload(path);
                await album.addPhoto(thumbnail);
                await Anime.updateOne({ anime_id }, { thumbnail: thumbnail.rawUrl })
                await fs.unlinkSync(path)
            }

            if (req.files['thumbnail'] && anime_id) {
                var fileName = req.files['thumbnail'][0].originalname
                var path = `../library/upload/anime/thumbnail/${fileName}`
                await gphotos.login();
                var album = await gphotos.searchOrCreateAlbum('Anime Cover');
                var thumbnail = await gphotos.upload(path);
                await album.addPhoto(thumbnail);
                await Anime.updateOne({ anime_id }, { thumbnail: thumbnail.rawUrl })
                await fs.unlinkSync(path)

            }

            if (req.files['cover'] && anime_id) {
                var fileName = req.files['cover'][0].originalname
                var path = `../library/upload/anime/cover/${fileName}`
                await gphotos.login();
                var album = await gphotos.searchOrCreateAlbum('Anime Banner');
                var cover = await gphotos.upload(path);
                await album.addPhoto(cover);
                await Anime.updateOne({ anime_id }, { cover: cover.rawUrl })
                await fs.unlinkSync(path)
            }
            return;

        } catch (err) {
            console.log(err.message)
        }
    },
    async uploadThumb(req, res, next) {
        try {
            var { thumbnail, episode_id, source } = res.locals
            if (thumbnail && episode_id) {
                var name = md5(source)
                var path = `../library/upload/thumbnail/${name}.jpg`
                await gphotos.login();
                var album = await gphotos.searchOrCreateAlbum('Episode Thumbnail');
                var thumbnail = await gphotos.upload(path);
                await album.addPhoto(thumbnail);
                await Episode.updateOne({ episode_id }, { thumbnail: thumbnail.rawUrl })
                await fs.unlinkSync(path)
            }
            return;

        } catch (err) {
            console.log(err.message)
        }
    }
}