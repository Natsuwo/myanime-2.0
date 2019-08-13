import axios from 'axios';
export default (headers) => {
    axios.defaults.headers.common['X-Myanime'] = 'www.myanime.co';
    axios.defaults.headers.common['Accept-Cookie'] = Date.now();
    return axios.create({
        baseURL: 'http://localhost:3000/api',
        headers: headers
    })
}