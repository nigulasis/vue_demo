<template>
  <div class="common-layout">
    <el-container>
      <el-header height="80px">
        <el-row :gutter="20" style="height: 80px">
          <el-col :span="4" style="background-color: #efa7a7">图片</el-col>
          <el-col :span="16" style="background-color: #cbe886"
            >后台管理demo</el-col
          >
          <el-col :span="4" style="background-color: #936545">咔卡熊</el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
           router
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="active"
            text-color="#fff"
            
          >
            <el-menu-item v-for="i in list" :key="i.path" :index="i.path">
              <el-icon><icon-menu /></el-icon>
              <span>{{i.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {useRouter,useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()
const list = router.getRoutes().filter(r=>r.meta.isShow)

const act = ()=>{
  if(route.path=="/"){
    const active = "/OrderView" 
    return active
  }else{
     const active = route.path 
     return active
  }
}
const active = act()

</script>

<style  scoped>
.el-col {
  text-align: center;
  line-height: 4;
  border-radius: 20px;
}

.el-menu{
  height: calc(100vh - 80px);
  border-radius: 15px;
}
.el-main{
  height: calc(100vh - 80px);
  overflow-y:auto ;
}
</style>