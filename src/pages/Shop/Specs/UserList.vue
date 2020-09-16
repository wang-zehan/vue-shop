<template>
    <div class="table-bg">
        <el-table :data="specslist">
            <el-table-column prop="id" label="ID" align="center" width="240px"></el-table-column>
            <el-table-column prop="specsname" label="规格名称" align="center"></el-table-column>
            <el-table-column label="规格值">
                <template slot-scope="scope">
                    <el-tag v-for="(item,index) in scope.row.attrs" :key="index" type="successr">{{item}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态">
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
        <el-pagination
        background
        @size-change="set_size"
        @current-change="set_page"
        :current-page="page"
        :page-sizes="[10 ,20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { delSpecs } from '@/requset/specs'
import { mapGetters,mapActions,mapMutations } from  "vuex"
export default {
    data(){
        return{

        }
    },
    created(){
    },
    computed:{
        ...mapGetters({
            specslist:"specs/specslist",
            page:"specs/page",
            size:"specs/size",
            total:"specs/total"
        })
    },
    mounted(){
        if(!this.specslist.length){
            this.get_specs_list();
        }
    },
    methods:{
        ...mapMutations({
            SET_PAGE:"specs/SET_PAGE"
        }),
        ...mapActions({
            get_specs_list:"specs/get_specs_list",
            set_page:"specs/set_page",
            set_size:"specs/set_size"
        }),
        edit(val){
            console.log(val),
            this.$emit("edit",{...val})
        },
        async del(uid){
                this.$confirm('确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await delSpecs(uid);
                    if(res.code == 200){
                        this.$message.success(res.msg);
                        //如果删除当钱页面只有1条数据，并且不是第一页
                        if(this.specslist.length==1 && this.page!=1){
                            this.SET_PAGE(this.page-1)
                        };
                        this.get_specs_list();
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