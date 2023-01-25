import axios from 'axios';
import { localStorageExport } from "../localStorage/local-storage";

const HTTPS = axios.create({
    baseURL: `http://127.0.0.1:8000/api/`,
})
HTTPS.defaults.headers.common['Authorization'] = `Bearer ${localStorageExport("jwtToken")}` 

const HTTP = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
})
export {HTTP,HTTPS}
