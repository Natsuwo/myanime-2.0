import Api from './Api'

export function getRecent(headers) {
    return Api(headers).get('/episode/recent');
}

export function getTrending(headers) {
    return Api(headers).get('/episode/trending');
}

export function getRandom(headers) {
    return Api(headers).get('/episode/random');
}

export function getCurrent(headers) {
    return Api(headers).get('/episode/current');
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