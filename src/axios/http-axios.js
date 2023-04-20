import axios from 'axios';
import { localStorageExport } from "../localStorage/local-storage";
const isProduction = process.env.NODE_ENV === 'production';

const HTTPS = axios.create({
    baseURL: isProduction ? 'http://142.11.239.33:8000/api/' : 'https://127.0.0.1/api/'
})
HTTPS.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorageExport('jwtToken')}`;
    return config;
});

const HTTP = axios.create({
    baseURL: isProduction ? 'http://142.11.239.33:8000/api/' : 'https://127.0.0.1/api/',
})
export { HTTP, HTTPS }
