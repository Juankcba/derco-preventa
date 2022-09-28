import axios from 'axios'

const storeApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STORE_URL,
});



export default storeApi;