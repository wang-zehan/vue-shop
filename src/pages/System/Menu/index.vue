<template>
    <div>
        <el-button type="primary" @click="add()">添加菜单</el-button>
        <!-- 列表组件  -->
        <menu-list @edit="edit"></menu-list>
        <!-- 添加/修改组件 -->
        <menu-info :info="info" ref="dialog"></menu-info>
    </div>
</template>

<script>
import MenuList from './MenuList'
import MenuInfo from './MenuInfo'
export default {
    data(){
        return{
            info:{
                isAdd:false,
                isShow:false
            }
        }
    },
    created(){},
    methods:{
        add(){
            this.info.isAdd = true,
            this.info.isShow = true
        },
        edit(val){
            this.info.isAdd = false,
            this.info.isShow = true,
            console.log(val),
            this.$refs.dialog.setinfo(val)
        }
    },
    components:{
        MenuList,MenuInfo
    }
}

</script>

<style scoped>
</style>