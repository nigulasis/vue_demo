import axios from "axios";
import { ElMessage } from "element-plus";


let baseUrl = process.env.VUE_APP_BASE_API
     
// 用户登陆接口

const $http = axios.create({
    baseURL:baseUrl,
    timeout:2000,
    headers:{
        "Content-Type":"application/json;charset=utf-8"
    }
})

//请求拦截
$http.interceptors.request.use(config=>{
    //程序不能确定config中有没有header----当然也可以提前做判断
    config.headers=config.headers|| {}
    if(localStorage.getItem("token")){
        //config.headers.token 接受的值只能是 string、number、boolean 假如 localStorage.getItem("token")为空 就会报错
        config.headers.token=localStorage.getItem("token")||''
    }
    return config
})

//响应拦截
$http.interceptors.response.use(res=>{
    const code:number = res.data.code
    if (code!= 200){  
        ElMessage.error('请求异常')
        return Promise.reject(res.data)
    }
    // ElMessage({
    //     message: '登录成功',
    //     type: 'success',
    //   })
    return res.data
},err=>{
    console.log(err)
})

export default $http