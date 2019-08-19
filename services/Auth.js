import Api from './Api'

export function signUp(form) {
    return Api().post('/auth/sign-up', form);
}

export function signIn(form) {
    return Api().post('/auth/sign-in', form);
}

export function signOut() {
    return Api().post('/auth/sign-out');
}

export function checkUserToken(headers) {
    return Api(headers).post('/auth/check-user-token');
}