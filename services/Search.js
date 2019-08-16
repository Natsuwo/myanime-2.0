import Api from './Api'

export function search(headers, q) {
    return Api(headers).get(`/search?q=${q}`);
}