<template>
    <div>
        <el-dialog :title="info.isAdd ? '添加菜单':'修改菜单'" @close="cancel" :visible.sync="info.isShow" width="40%">
            <el-form :model="forminfo" ref="form" :rules="rules" label-width="180px">
                <el-form-item label="菜单类型">
                    <el-radio-group v-model="forminfo.type">
                        <el-radio :label="1">目录</el-radio>
                        <el-radio :label="2">菜单</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="forminfo.type==2" label="上级目录" >
                     <el-select v-model="forminfo.pid" placeholder="请选择">
                        <el-option label="顶级目录" :value="0"></el-option>
                        <el-option v-for="item in menulist" :key="item.id" v-if="item.type==1" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="forminfo.type==1?'目录名称':'菜单名称'" prop="title">
                    <el-input v-model="forminfo.title"></el-input>
                </el-form-item>
                <el-form-item label="目录图标" prop="icon">
                    <el-input v-model="forminfo.icon"></el-input>
                </el-form-item>
                <el-form-item label="菜单地址" v-if="forminfo.type==2" prop="url">
                    <el-input v-model="forminfo.url"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">确 定</el-button>
                    <el-button type="warning" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { addMenu,editMenu } from "@/requset/menu"
import { mapGetters,mapActions } from  "vuex"
let defaultItem ={
    pid:0,
    title:"",
    icon:"",
    type:1, //1目录2菜单
    url:"",
    status:1    //状态1正常2禁用
}
let resetItem = {...defaultItem}
export default {
    props:{
        info:{
            type:Object,
            default(){
                return{
                    iaAdd:true,
                    isShow:flase
                }
            }
        }
    },
    data(){
        return{
            forminfo:{...defaultItem},
            rules:{ //验证规则对象
                title:[ { required: true, message: '必填！', trigger: 'blur' }],    //resquired必填、message提示语句、triggr什么时候触发
                // icon:[ { required: true, message: '必填！', trigger: 'blur' }],
                url:[ { required: true, message: '必填！', trigger: 'blur' }],
            }
        }
    },
    created(){
    },
    computed:{
        ...mapGetters({
            menulist:"menu/menulist"
        })
    },
    mounted(){
        if(!this.menulist.length){
            this.get_menu_list()
        }
    },
    methods:{
        ...mapActions({
            get_menu_list:"menu/get_menu_list"
        }),
        setinfo(val){
            defaultItem = {...val}; 
            this.forminfo = {...val}
        },
        async submit(){
            this.$refs.form.validate(async valid=>{ //表单验证
                if(valid){  //如果验证通过
                    let res;
                    if(this.info.isAdd){    //添加
                        res = await addMenu(this.forminfo)
                    }else{
                        res = await editMenu(this.forminfo)
                    }
                    if(res.code==200){
                        this.$message.success(res.msg);  //$mesage是Elemen-UI注入到vue实例中的属性
                        this.info.isShow = false;
                        this.get_menu_list();
                        this.cancel();
                    }else{
                        this.$message.error(res.msg)
                    }
                }
            });   
        },
        reset(){
            if(this.info.isAdd){    //添加时的重置 
                this.forminfo = {...resetItem}
            }else{  //修改时的重置
                this.setinfo({...defaultItem})
            }
        },
        cancel(){
            this.forminfo = {...resetItem}
        }   
    },
    components:{}
}

</script>

<style scoped>
</style>