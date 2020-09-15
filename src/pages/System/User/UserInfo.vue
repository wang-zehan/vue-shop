<template>
    <div>
        <el-dialog :title="info.isAdd ? '添加管理员':'修改管理员'" @close="cancel" :visible.sync="info.isShow" width="40%">
            <el-form :model="forminfo" ref="form" :rules="rules" label-width="180px">
                <el-form-item label="管理员角色" prop="roleid">
                    <el-select v-model="forminfo.roleid" placeholder="请选择角色">
                        <el-option v-for="item in roielist" :key="item.id" :label="item.rolename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理员名称" prop="username">
                    <el-input v-model="forminfo.username" placeholder="请输入管理员名称"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" prop="password" v-if="info.isAdd">
                    <el-input v-model="forminfo.password" placeholder="请输入管理员密码"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" v-else>
                    <el-input v-model="forminfo.password" placeholder="密码留空表示不修改"></el-input>
                </el-form-item>
                <el-form-item label="管理员状态">
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
import { addUser,editUser } from "@/requset/user"
import { mapGetters,mapActions } from  "vuex"
let defaultItem ={
    roleid:"",
    username:"",
    password:"",
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
                roieid:[ { required: true, message: '必填！', trigger: 'blur' }],    //resquired必填、message提示语句、triggr什么时候触发
                username:[ { required: true, message: '必填！', trigger: 'blur' }],    //resquired必填、message提示语句、triggr什么时候触发
                password:[ { required: true, message: '必填！', trigger: 'blur' }],    //resquired必填、message提示语句、triggr什么时候触发
            },
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
            this.get_roie_list()
        }
    },
    methods:{
        ...mapActions({
            get_roie_list:"roie/get_roie_list",
            get_user_list:"user/get_user_list"
        }),
        setinfo(val){
            val.password = "",
            defaultItem = {...val}; 
            this.forminfo = {...val}
        },
        async submit(){
            if(this.isAdd && !this.forminfo.password){
                this.$message.warning("请输入密码")
                return;
            }
            this.$refs.form.validate(async valid=>{ //表单验证
                if(valid){  //如果验证通过
                    let res;
                    if(this.info.isAdd){    //添加
                        res = await addUser(this.forminfo)
                    }else{
                        res = await editUser(this.forminfo)
                    }
                    if(res.code==200){
                        this.$message.success(res.msg);  //$mesage是Elemen-UI注入到vue实例中的属性
                        this.info.isShow = false;
                        this.get_user_list();   //提交之后重新获取角色列表
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