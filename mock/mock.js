
import qs from 'qs'
// 引入mockjs
let baseUrl = process.env.VUE_APP_BASE_API
export const LOGIN_URL = `${baseUrl}/login`

const Mock =require('mockjs')
// 模拟登陆接口
Mock.mock(LOGIN_URL,(req,res) =>{
  const data = JSON.parse(req.body);

  const username = data.username ;
  const password = data.password;
  
  if(username === 'admin' && password === '123456'){
    return {
      'code':'200',
      'msg':'登陆成功',
      'data':{
        'orgCode':'35002',
        'token':'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJvcmdDb2RlIjoiMzUwMDAiLCJkZXB0Q29kZSI6IjM1MDAwIiwiYXVkIjoiYWRtaW4iLCJpc3MiOiJhZG1pbiIsImV4cCI6MTU5MzUzNTU5OH0.0pJAojRtT5lx6PS2gH_Q9BmBxeNlgBL37ABX22HyDlebbr66cCjVYZ0v0zbLO_9241FX9-FZpCkEqE98MQOyWw',
      }
    }
  }else{
    return {
      'code':'999',
      'msg':'登陆失败'
    }
  }
 
})
