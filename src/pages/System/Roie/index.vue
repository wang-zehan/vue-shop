<template>
    <div>
        <el-button type="primary" @click="add()">添加角色</el-button>
        <!-- 列表组件  -->
        <roie-list @edit="edit"></roie-list>
        <!-- 添加/修改组件 -->
        <roie-info :info="info" ref="dialog"></roie-info>
    </div>
</template>

<script>
import RoieList from './RoieList'
import RoieInfo from './RoieInfo'
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
        RoieList,RoieInfo
    }
}

</script>

<style scoped>
</style>