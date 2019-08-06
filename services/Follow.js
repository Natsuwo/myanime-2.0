import Api from './Api'

export function follow(headers, form) {
    return Api(headers).post('/follow', form);
}

export function getNoti(headers, form) {
    return Api(headers).put('/get-noti', form);
}

export function unNoti(headers, form) {
    return Api(headers).put('/un-noti', form);
}

export function unFollow(headers, form) {
    return Api(headers).delete('/follow', {data: form});
}