import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // This will allow cookies to be sent with the request
    headers: {
        "Content-Type": "application/json",
    },

});

axios.defaults.withCredentials = true
export const axiosPrivate = axios.create({
    

    baseURL: 'http://localhost:8080',
    headers: {
        // 'Content-Type': 'multipart/form-data'
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
export const axiosMulti = axios.create({
    

    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});

