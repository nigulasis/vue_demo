<template>
  <div>
    <div>
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="成员">
          <el-input v-model="selectData.nickname" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择">
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickname" label="成员" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button
            v-for="i in scope.row.role"
            :key="i.roleId"
            type="text"
            size="small"
          >
            {{i.roleName}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="eidFun(scope.row)"
           
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
 
  <el-dialog title="Shipping address" v-model ="isShow">
    <el-form :model="active">
      <el-form-item label="成员" label-width="50px">
        <el-input placeholder="选择成员" v-model="active.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="active.role" placeholder="选择角色">
          <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
        <el-button @click="isShow= false">取消</el-button>
        <el-button type="primary" @click="userChange" >修改</el-button>
        </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs,ref } from "vue";
import { InitData, UserListInt,ActiveInt } from "@/types/user";
import { getUserList, getRoleList } from "@/http/api";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getUserList().then((res) => {
        data.list = res.data;
        data.listData = res.data;
      });

      getRoleList().then((res) => {
        data.roleList = res.data;
      });
    });
    const onSubmit = () => {
      let arr: [UserListInt][] = [];
      if (data.selectData.nickname || data.selectData.role) {
        if (data.selectData.nickname) {
          arr = data.listData.filter(
            (v: any) => v.nickname.indexOf(data.selectData.nickname) != -1
          );
        }
        if (data.selectData.role) {
          arr = (data.selectData.nickname ? arr : data.listData).filter(
            (v: any) =>
              v.role.find((i: any) => i.roleId == data.selectData.role)
          );
        }
      } else {
        arr = data.listData;
      }
      data.list = arr;
    };
    const eidFun=(row:UserListInt)=>{
        data.active={
            id: row.id,
            nickname: row.nickname,
            username: row.username,
            role:row.role.map((v:any)=>v.roleId)
        }
       
        data.isShow = true
    }
    const userChange=()=>{
        const obj:any = data.list.find((v:any)=>v.id==data.active.id)
        obj.nickname = data.active.nickname
        obj.role = data.roleList.filter((v:any)=>data.active.role.indexOf(v.roleId)!=-1)
        data.isShow= false
    }
    const dialogFormVisible = ref(false)
    const dialogTableVisible = ref(false)
    return {
      ...toRefs(data),
      eidFun,
      onSubmit,
      userChange,
      dialogFormVisible,
      dialogTableVisible
    };
  },
});
</script>
