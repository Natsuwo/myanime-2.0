import Api from './Api'

export function getUserMeta(headers, user_id, anime_id, episode_id, comment_id) {
    var animeQuery = anime_id ? `&anime_id=${anime_id}` : ''
    var episodeQuery = episode_id ? `&episode_id=${episode_id}` : ''
    var commentQuery = comment_id ? `&comment_id=${comment_id}` : ''
    return Api(headers).get(`/user/get-usermeta?user_id=${user_id}${animeQuery}${episodeQuery}${commentQuery}`);
}

export function updateProfile(headers, form) {
    return Api(headers).put('/user/profile', form);
}

export function getFollowing(headers) {
    return Api(headers).get('/user/following');
}

export function getLists(headers) {
    return Api(headers).get('/user/profile/follow');
}