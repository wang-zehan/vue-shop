<template>
    <div class="table-bg">
        <el-table :data="roielist">
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>
            <el-table-column label="角色状态">
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
import { delRoie } from '@/requset/roie'
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
            roielist:"roie/roielist"
        })
    },
    mounted(){
        if(!this.roielist.length){
            this.get_roie_list();
        }
    },
    methods:{
        ...mapActions({
            get_roie_list:"roie/get_roie_list"
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
                    let res = await delRoie(id);
                    if(res.code == 200){
                        this.$message.success(res.msg);
                        this.get_roie_list();
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