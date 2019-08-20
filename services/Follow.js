import Api from './Api'

export function follow(headers, form) {
    return Api(headers).post('/follow', form);
}

export function changeType(headers, form) {
    return Api(headers).put('/follow', form);
}

export function unFollow(headers, form) {
    return Api(headers).delete('/follow', { data: form });
}

