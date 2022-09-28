import axios from 'axios'

const cesApi = axios.create({
    baseURL: 'https://middleware.staging.soho.cl/api/v4',
});


cesApi.defaults.headers.common['blog-url'] = "haval";
export default cesApi;