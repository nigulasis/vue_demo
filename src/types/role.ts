//权限列表接口----与服务端一致
export interface RoleListInt {
    roleId:number,
    roleName:string,
    authority:number[]
}

//筛选数据接口---自定义
interface selectDataInt {
   roleName: string
    roleId:number
}

//以类的方式导出数据
export class InitData {
    selectData: selectDataInt = {
        roleName:'',
        roleId:0
    }
    list: RoleListInt[] = []
    
    isAdd = false
   
}
