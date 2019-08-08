import Api from './Api'

export function getEpisodes() {
    return Api().get('/episode/get');
}

export function getEpisode(headers, form) {
    return Api(headers).post('/episode/get-source', form);
}

export function getUserMeta(headers, anime_id, episode_id) {
    return Api(headers).get(`/episode/get-usermeta?anime_id=${anime_id}&episode_id=${episode_id}`);
}

export function getDataSidebar(headers, episode_id) {
    return Api(headers).get(`/episode/get-sidebar?episode_id=${episode_id}`);
}