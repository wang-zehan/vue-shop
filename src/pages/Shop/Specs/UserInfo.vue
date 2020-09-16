<template>
    <div>
        <el-dialog :title="info.isAdd ? '添加规格':'修改规格'" @close="cancel" :visible.sync="info.isShow" width="40%">
            <el-form :model="forminfo" ref="form" :rules="rules" label-width="180px">
                <el-form-item label="属性名" prop="specsname">
                    <el-input v-model="forminfo.specsname" placeholder="请输入属性名"></el-input>
                </el-form-item>
                <el-form-item label="属性值">
                    <label v-for="(item,index) in list" :key="index">
                        <el-input style="display:inline-block;width:160px;margin-bottom:10px" v-model="item.value" placeholder="请输入属性值"></el-input>
                        <el-button v-if="index==0" @click="addVal" type="primary">增加属性</el-button>
                        <el-button v-else @click="delVal(index)" type="danger">删除属性</el-button>
                    </label>
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
import { addSpecs,editSpecs } from "@/requset/specs"
import { mapGetters,mapActions } from  "vuex"
let defaultItem ={
    specsname:"",
    attrs:"",
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
                specsname:[{ required: true, message: '必填！', trigger: 'blur' }],    //resquired必填、message提示语句、triggr什么时候触发
            },
            list:[{value:""}]
        }
    },
    created(){
    },
    methods:{
        ...mapActions({
            get_specs_list:"specs/get_specs_list"
        }),
        addVal(){
            this.list.push({value:''});
        },
        delVal(val){
            this.list.splice(val,1)
        },
        setinfo(val){
            this.list = val.attrs.map(v=>({
                value:v
            })),
            defaultItem = {...val},
            this.forminfo = {...val}
        },
        async submit(){
            if(!this.list.every(val=>val.value)){ //判断val里面有没有值，没有返回false
                this.$message.warning("请输入规格值");
                return;
            }
            this.forminfo.attrs = this.list.map(val=>val.value);
            this.forminfo.attrs = this.forminfo.attrs.join(',')
            console.log(this.forminfo.attrs)
            this.$refs.form.validate(async valid=>{ //表单验证
                if(valid){  //如果验证通过
                    let res;
                    if(this.info.isAdd){    //添加
                        res = await addSpecs(this.forminfo)
                    }else{
                        res = await editSpecs(this.forminfo)
                    }
                    if(res.code==200){
                        this.$message.success(res.msg);  //$mesage是Elemen-UI注入到vue实例中的属性
                        this.info.isShow = false;
                        this.get_specs_list();   //提交之后重新获取角色列表
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
            this.forminfo = {...resetItem},
            // this.forminfo.attrs.value = ""
            this.list = [{value:''}]
        }   
    },
    components:{}
}

</script>

<style scoped>
</style>