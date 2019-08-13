import Api from './Api'

export function Secure(headers) {
    return Api(headers).get('/v2/secure');
}