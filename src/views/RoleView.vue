<template>
    <div>
        
            <el-button type="primary" @click="onSubmit">添加角色</el-button>
        

        <el-table :data="list" style="width: 100%">
            <el-table-column prop="roleId" label="ID" width="180" />
            <el-table-column prop="roleName" label="成员" width="180" />
            <el-table-column prop="authority" label="权限">
                <template #default="scope">
                    <el-button @click="userChange(scope.row)" type="text" size="small">
                        修改权限
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>

   
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { InitData, RoleListInt } from "@/types/role";
import { getRoleList } from "@/http/api";
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const data = reactive(new InitData());
        const router = useRouter()
        onMounted(() => {
            getRoleList().then((res) => {
                data.list = res.data;
            });
        });

        const userChange = (row: RoleListInt) => {
            
            router.push({
                path:"authority",
                query:{
                    id:row.roleId,
                    authority:row.authority.join(',')
                }
            })
        }
        const onSubmit = () => {
            ElMessageBox.prompt('请输入角色名', '添加', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',

            })
                .then(({ value }) => {
                    if (value) {
                        data.list.unshift({
                            roleName:value,
                            roleId:data.list.length+1,
                            authority:[]

                        }
                        )
                    }
                    ElMessage({
                        type: 'success',
                        message:'取消操作',
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消操作',
                    })
                })
        }

        return {
            ...toRefs(data),
            userChange,
            onSubmit,
        };
    },
});
</script>

function authority(authority: any) {
  throw new Error("Function not implemented.");
}
