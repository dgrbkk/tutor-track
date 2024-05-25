import axios from "axios"

export const baseUrl = "http://localhost:3000"

export const server = axios.create({
    baseURL: baseUrl
});

server.interceptors.request.use(function (config) {
    const token = window.localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

server.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    return Promise.reject(error);
});