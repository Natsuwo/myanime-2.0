import Api from './Api'

export function getComment(headers) {
    return Api(headers).get('/comment');
}

export function add(headers, form) {
    return Api(headers).post('/comment', form);
}

export function reply(headers, form) {
    return Api(headers).post('/reply', form);
}

export function edit(headers, form) {
    return Api(headers).put('/comment', form);
}

export function remove(headers, form) {
    return Api(headers).delete('/comment', { data: form });
}

export function attachHeart(headers, form) {
    return Api(headers).post('/comment-heart', form);
}

export function unHeart(headers, form) {
    return Api(headers).delete('/comment-heart', { data: form });
}