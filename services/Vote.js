import Api from './Api'

export function like(headers, form) {
    return Api(headers).post('/vote-episode', form);
}

export function changeVote(headers, form) {
    return Api(headers).put('/vote-episode', form);
}

export function unlike(headers, form) {
    return Api(headers).delete('/vote-episode', {data: form});
}