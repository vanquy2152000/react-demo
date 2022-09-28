import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    return response && response.data ? response.data : response;
}, function (error) {
    NProgress.done();
    console.log("check error : ", error);
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;