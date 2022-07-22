<template>
  <div>
    <div>
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="selectData.name" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.body" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list[selectData.page]" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="body" label="详情" />
    </el-table>
    <div class="example-pagination-block">
   
    <el-pagination @current-change="change"   layout="prev, pager, next" :total="selectData.count" />
  </div>
  </div>
</template>

<script lang="ts" >
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { InitData } from "@/types/order";
import { getlist } from "@/http/api";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getlist().then((res) => {
        data.selectData.count=res.data.data.length
        data.datalist = res.data.data
        sliceList(res.data.data)
      });
    });
    const sliceList=(list:any[])=>{
      data.list=[]
      for (let index = 0; index < list.length; index+=10) {
        let da:any =list.slice(index,index+10)
        data.list.push(da)        
      }
    }

    const change=(page:number)=>{
      data.selectData.page=page-1
    }

    const onSubmit= ()=>{
      let arr :any=[]
      if(data.selectData.name ||data.selectData.body){
          if(data.selectData.name){
           arr = data.datalist.filter(v=>v.name.indexOf(data.selectData.name)!=-1)
          }
          if(data.selectData.body){
           arr = data.datalist.filter(v=>v.body.indexOf(data.selectData.body)!=-1)
          }
      }else{
        arr = data.datalist
      }
      sliceList(arr)
    }
    
    return {
      ...toRefs(data),
      change,
      onSubmit  
    };
  },
});
</script>
