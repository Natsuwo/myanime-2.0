import Api from './Api'

export function getChannel(headers, id) {
    var animeQuery = id ? `?anime_id=${id}` : ''
    return Api(headers).get(`/anime/get-channel${animeQuery}`);
}
