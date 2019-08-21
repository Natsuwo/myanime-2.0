import Api from './Api'

export function getChannel(headers, id) {
    var animeQuery = id ? `?anime_id=${id}` : ''
    return Api(headers).get(`/anime/get-channel${animeQuery}`);
}

export function getTerms(headers) {
    return Api(headers).get('/anime/get-term');
}

export function loadMoreChannel(headers, anime_id, skip) {
    return Api(headers).get(`/anime/loadmore-channel?anime_id=${anime_id}&skip=${skip}`);
}

export function getSeason(headers, season, skip) {
    var seasonQuery = season ? `?season=${season}` : ''
    var skipQuery = skip ? `&skip=${skip}` : ''
    return Api(headers).get(`/anime/get-season${seasonQuery}${skipQuery}`);
}