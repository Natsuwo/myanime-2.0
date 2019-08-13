import Api from './Api'

export function getUserMeta(headers, user_id, anime_id, episode_id, comment_id) {
    var animeQuery = anime_id ? `&anime_id=${anime_id}` : ''
    var episodeQuery = episode_id ? `&episode_id=${episode_id}` : ''
    var commentQuery = comment_id ? `&comment_id=${comment_id}` : ''
    return Api(headers).get(`/user/get-usermeta?user_id=${user_id}${animeQuery}${episodeQuery}${commentQuery}`);
}