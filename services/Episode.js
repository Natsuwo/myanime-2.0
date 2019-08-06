import Api from './Api'

export function getEpisodes() {
    return Api().get('/episode/get');
}

export function getEpisode(headers, form) {
    return Api(headers).post('/episode/get-source', form);
}

export function likeEpisode(headers, form) {
    return Api(headers).post('/episode/vote', form);
}