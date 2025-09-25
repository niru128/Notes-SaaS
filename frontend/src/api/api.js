import axios from 'axios';


const API = axios.create({ baseURL: 'https://notes-saa-l2p1ou9fl-niranjan-c-bs-projects.vercel.app/api'
 });

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
})

export default API;