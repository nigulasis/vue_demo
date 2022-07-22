import $http from "./index";

interface loginData{
    username:string,
    password:string
}

export const loginApi = (data:loginData) =>$http({url:'/login',method:'post',data})
export const getlist = () =>$http({url:'/getlist',method:'get'})

export const getRoleList = () =>$http({url:'/getRoleList',method:'get'})
export const getUserList = () =>$http({url:'/getUserList',method:'get'})

export const getRouterList = () =>$http({url:'/getRouterList',method:'get'})