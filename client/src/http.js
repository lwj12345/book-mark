import axios from 'axios'
import { Message, Loading } from 'element-ui';
let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}

let http=axios.create({
    baseURL:'http://127.0.0.1:5000'
})
http.interceptors.request.use(config=>{
    // 加载
    startLoading()
    //判断本地存储中有没有token
    if(window.localStorage.token){
        config.headers.Authorization=window.localStorage.token;
    }
    return config
}, error => {
    return Promise.reject(error)
})
// 响应拦截  401 token过期处理，要发起请求后才会进行响应拦截
http.interceptors.response.use(res=>{
    endLoading()
    if(res.data.status==401){
        Message.warning('登录已过期，请重新登录');
        window.localStorage.removeItem('token')
        return location.pathname='/login';
    } 
    return res
},err=>{
    endLoading()
    return Promise.reject(err)
})
export default http;