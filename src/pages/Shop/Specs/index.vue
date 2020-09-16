<template>
    <div>
        <el-button type="primary" @click="add()">添加规格</el-button>
        <!-- 列表组件  -->
        <user-list @edit="edit"></user-list>
        <!-- 添加/修改组件 -->
        <user-info :info="info" ref="dialog"></user-info>
    </div>
</template>

<script>
import UserList from './UserList'
import UserInfo from './UserInfo'
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
        UserList,UserInfo
    }
}

</script>

<style scoped>
</style>