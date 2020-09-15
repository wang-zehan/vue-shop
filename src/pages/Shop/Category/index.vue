<template>
    <div>
        <el-button type="primary" @click="add()">添加分类</el-button>
        <!-- 列表组件  -->
        <category-list @edit="edit"></category-list>
        <!-- 添加/修改组件 -->
        <category-info :info="info" ref="dialog"></category-info>
    </div>
</template>

<script>
import CategoryList from './CategoryList'
import CategoryInfo from './CategoryInfo'
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
        CategoryList,CategoryInfo
    }
}

</script>

<style scoped>
</style>