<template>
  <div>
    <el-container class="page">
        <el-aside :width="iscollapse ? '64px':'200px'" class="page-nav">
            <left></left>
        </el-aside>
        <el-container class="page-content">
            <el-header class="page-header">
                <top></top>
            </el-header>
            <el-main class="page-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    
  </div>
</template>

<script>
import { mapState } from "vuex"
import Left from './Left'
import Top from './Top'
export default {
  data() {
    return {};
  },
  created() {},
  computed:{
      ...mapState(['iscollapse'])
  },
  methods: {},
  components: {
      Left,Top
  },
};
</script>

<style scoped>
.page{
    width: 100vw;
    height: 100vh;
}
.page-nav{
    height: 100%;
    background-color:#444;
}
.page-content{
    height: 100%;
    background-color:#f7f7f7;
}
.page-header{
    background-color:#fff;
    box-shadow: 0 0 4px 0 rgb(0,0,0,.3)
}
</style>