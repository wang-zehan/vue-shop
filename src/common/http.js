import axios from 'axios';
import router from "@/router";

let $axios = axios.create({
    baseURL:"/api",
    timeout:3000
})
//请求拦截器
$axios.interceptors.request.use(function(config){   //请求响应器中返回的config参数是当前请求数据的地址信息
    if(config.url =='/userlogin'){
        return config
    }else{
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));
        config.headers.authorization = userinfo.token;
        return config
    }
},function(error){
    return Promise.reject(error)
})
//响应拦截器
$axios.interceptors.response.use(function(response){
    if(response.data.code == 403){
        router.replace("/login");
        return response.data
    }else{
        return response.data
    }
},function(error){
    return Promise.reject(error)
})


export default $axios