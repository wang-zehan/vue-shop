<template>
    <el-row class="login-bg">
        <el-col :span="8" class="login-box">
            <h3>小u商城管理系统</h3>
            <el-form :model="forminfo" ref="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input placeholder="请输入账号" v-model="forminfo.username">
                <template slot="prepend"><i class="el-icon-user"></i></template>
            </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" show-password v-model="forminfo.password">
                        <template slot="prepend"><i class="el-icon-lock"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit" class="login-btn">提交</el-button>
                </el-form-item>   
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import { mapActions } from "vuex"
export default {
    data(){
        return{
            forminfo:{
                username:"小王",
                password:"123"
            },
            rules:{
                username:{ required: true, message: '必填！', trigger: 'blur' },
                password:{ required: true, message: '必填！', trigger: 'blur' } 
            }  

        }
    },
    created(){},
    methods:{
        ...mapActions({
            login:"user/login"
        }),
        submit(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    this.login(this.forminfo)
                }
            })
        }
    },
    components:{}
}

</script>

<style scoped>
.login-bg{
    width: 100vw;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/imgs/timg.jpg");
    background-size: 100% 100%;
    text-align: center;
}
.login-box{
    background-color:#fff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.3);
    opacity: 0.7;
    padding:20px 40px;
    border-radius:5px;
    border:1px solid #eee;
}
.login-box h3{
    line-height:40px;
    text-align:center;
    padding-bottom: 20px;
}
.login{
    width: 160px;
}
</style>