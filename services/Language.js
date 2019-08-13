import Api from './Api'

export function getFlags(headers) {
    return Api(headers).get('/language/get-flags');
}