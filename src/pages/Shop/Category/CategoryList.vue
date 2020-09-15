<template>
    <div class="table-bg">
        <el-table borde :data="categorylist" row-key="id" :tree-props="{children: 'children'}">
            <el-table-column prop="pid" label="ID" align="center"></el-table-column>
            <el-table-column prop="catename" label="菜单名称" align="center"></el-table-column>
            <el-table-column label="图标">
                <template slot-scope="scope">
                    <img v-if="scope.row.img" :src="scope.row.img | pixImg" alt="" width="50px">
                    <p v-else>暂无图片</p>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.status==1">启用</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                    <el-button type="info" size="small" @click="del(scope.row.id)" circle icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { delCategory  } from '@/requset/category'
import { mapGetters,mapActions } from  "vuex"
export default {
    data(){
        return{

        }
    },
    created(){
        
    },
    computed:{
        ...mapGetters({
            categorylist:"category/categorylist"
        })
    },
    mounted(){
        if(!this.categorylist.length){
            this.get_category_list();
        }
    },
    methods:{
        ...mapActions({
            get_category_list:"category/get_category_list"
        }),
        edit(val){
            console.log(val),
            this.$emit("edit",{...val})
        },
        async del(id){
                this.$confirm('确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await delCategory(id);
                    if(res.code == 200){
                        this.$message.success(res.msg);
                        this.get_category_list();
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(()=>{})
        }
    },
    components:{}
}

</script>

<style scoped>
</style>