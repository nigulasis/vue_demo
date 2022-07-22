//用户列表接口---与服务端一致
export interface UserListInt {
    id: string
    nickname: number
    username: string
    role:RouleInt[]
}
interface RouleInt{
    roleId:number,
    roleName:string
}

export interface ActiveInt {
    id: string
    nickname: number
    username: string
    role:number[]
}

//权限列表接口----与服务端一致
interface RoleListInt {
    roleId:number,
    roleName:string,
    authority:number[]
}

//筛选数据接口---自定义
interface selectDataInt {
    nickname: string
    role:number
}

//以类的方式导出数据
export class InitData {
    selectData: selectDataInt = {
        nickname:'',
        role:0
    }
    list: [UserListInt][] = []
    listData: [UserListInt][] = []
    roleList:RoleListInt[]=[]
    active:ActiveInt={
        id: "",
        nickname: 0,
        username: "",
        role: []
    }
    isShow = false
}
