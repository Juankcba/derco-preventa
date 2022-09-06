import axios from 'axios'

const cmsApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});


cmsApi.defaults.headers.common['blog-url'] = "dercocenter";
export default cmsApi;