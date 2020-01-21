const fs = require('fs')
const axios = require('axios')
const { encrypt } = require('./crypto.helper')
module.exports = {
    async getSource(drive_id) {
        var drDomain = process.env.DRDOMAIN
        var endpoint = drDomain + '/api/v2/hls-drive/get-data'
        var token = process.env.DRTOKEN
        var user_id = process.env.DRUSER
        var query = `?user_id=${user_id}&drive_id=${drive_id}&secret_token=${token}`
        var checkProgress = await axios.get(drDomain + '/api/v2/hls-drive/progress' + query)
        if (checkProgress.data.success) {
            var progress = checkProgress.data.progress
            if (progress.rendered && progress.deleted) {
                var resp = await axios.get(endpoint + query)
                var data = resp.data
                if (!data.success) return null
                var id = data.results.id
                var link = drDomain + '/hls/' + id + '.m3u8'
                return link
            }
            return null
        }
        return null
    },
    async getProxy(drive_id) {
        var proxyDomain = "https://s1.myanime.co"
        var endpoint = proxyDomain + "/video/" + encrypt(drive_id)
        return endpoint
    },
    async countView(episode_id) {
        var data = await fs.readFileSync('../newupload.json', { encoding: 'utf8' })
        var oldData = JSON.parse(data)
        var index = oldData.findIndex(x => x.episode_id === episode_id)
        if (index > -1) {
            oldData[index].views += 1
            await fs.writeFileSync('../newupload.json', JSON.stringify(oldData), { encoding: 'utf8' })
        }
    }
}