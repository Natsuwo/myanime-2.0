import Api from './Api'

export function getEpisodes(headers) {
    return Api(headers).get('/episode/get');
}

export function getEpisode(headers, episode_id) {
    var episodeQuery = episode_id ? `?episode_id=${episode_id}` : ''
    return Api(headers).get(`/episode/get-episode${episodeQuery}`);
}

export function jumpEpisode(headers, anime_id, number, fansub) {
    return Api(headers).get(`/episode/jump-episode?anime_id=${anime_id}&number=${number}&fansub=${fansub}`)
}

export function getUserMeta(headers, anime_id, episode_id) {
    return Api(headers).get(`/episode/get-usermeta?anime_id=${anime_id}&episode_id=${episode_id}`);
}

export function sidebarLoadmore(headers, episode_id, skip) {
    return Api(headers).get(`/episode/sidebar-loadmore?episode_id=${episode_id}&skip=${skip}`);
}