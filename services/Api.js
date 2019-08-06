import axios from 'axios';
export default (headers) => { 
    return axios.create({
        baseURL: 'http://localhost:3000/api',
        headers: headers
    })
}