import { getRouterList } from '@/http/api'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "../views/HomeView.vue"

const routes: Array<RouteRecordRaw> = [
  // {path:'/', redirect: 'OrderView'},
  {
    path: '/',
    name: 'home',
    component:HomeView,
    redirect:"order",
    children:[],

//     children:[
//       {
//         path:'order',
//         name:'order',
//         meta:{
//           isShow:true,
//           title:"订单列表"
//         },
//         component:() => import(/* webpackChunkName: "order" */ '../views/OrderView.vue')
//       },
//       {
//         path:'userList',
//         name:'userList',
//         meta:{
//           isShow:true,
//           title:"用户列表"
//         },
//         component:() => import(/* webpackChunkName: "userList" */ '../views/UserView.vue')
//       },
//       {
//         path:'roleList',
//         name:'roleList',
//         meta:{
//           isShow:true,
//           title:"角色列表"
//         },
//         component:() => import(/* webpackChunkName: "roleList" */ '../views/RoleView.vue') 
//       },
//       {
//         path:'authority',
//         name:'authority',
//         meta:{
//           isShow:false,
//           title:"权限列表"
//         },
//         component:() => import(/* webpackChunkName: "authorityList" */ '../views/AuthorityView.vue')
//       }
//     ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach(async (to:any)=>{
  const token:string | null =localStorage.getItem('token')
  if(!token && to.path !="/login"){
  
    return "login"
  }else if(token && to.path !="/login"){
    if(router.getRoutes().length==2){
      //添加路由
      let routerData:any =await getRouterList()
      routerData =routerData.data
      console.log(routerData);
      
      routerData.forEach((v:any)=>{
        const routerObj:RouteRecordRaw={
          path:v.name,
          name:v.name,
          meta:v.meta,
          component: () => import(/* webpackChunkName: "[request]" */ `../views/${v.path}.vue`)
        }
        router.addRoute('home',routerObj)
      })
      router.replace(to.path)
      
    }
  }else if(token && to.path =="/login" )
    return '/OrderView'
})

export default router
