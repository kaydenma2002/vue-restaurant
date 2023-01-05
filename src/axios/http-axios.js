import axios from 'axios';
const HTTPS = axios.create({
    baseURL: `http://127.0.0.1:8000/api/`,
    headers: {
        Authorization: 'Bearer {token}'
    }
})
const HTTP = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
})
export {HTTP,HTTPS}
