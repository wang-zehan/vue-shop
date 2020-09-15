<template>
    <div>
        <el-dialog :title="info.isAdd ? '添加角色':'修改角色'" @close="cancel" :visible.sync="info.isShow" width="40%">
            <el-form :model="forminfo" ref="form" :rules="rules" label-width="180px">
                <el-form-item label="角色名称" prop="rolename">
                    <el-input v-model="forminfo.rolename"></el-input>
                </el-form-item>
                <el-form-item label="角色权限">
                    <el-tree
                    default-expand-all
                    node-key="id"
                    :data="menulist"
                    :props="{children:'children',label:'title'}"
                    ref="tree" 
                    show-checkbox
                    :check-strictly="checkStrictly"
                    >
                    </el-tree>
                </el-form-item>
                <el-form-item label="角色状态">
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
import { addRoie,editRoie } from "@/requset/roie"
import { mapGetters,mapActions } from  "vuex"
let defaultItem ={
    rolename:"",
    menus:"",
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
                rolename:[ { required: true, message: '必填！', trigger: 'blur' }],    //resquired必填、message提示语句、triggr什么时候触发
            },
            checkStrictly:false     //false表示父子关联
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
            get_menu_list:"menu/get_menu_list",
            get_roie_list:"roie/get_roie_list"
        }),
        setinfo(val){
            // console.log(val)
            //将权限节点回显
            let idarr = val.menus.split(",");
            if(idarr[0]){
                this.checkStrictly = true;
                //等到节点渲染完成再做某个事情！ this.$nextTick(()=>{等到vue把节点渲染完成再做某些事情})
                this.$nextTick(()=>{
                    this.$refs.tree.setCheckedKeys(idarr);
                    this.checkStrictly = false;
                })
            };
            defaultItem = {...val}; 
            this.forminfo = {...val}
        },
        async submit(){
            let idarr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
            if(idarr.length){
                this.forminfo.menus = idarr;
            }else{
                this.$message.warning("请选择权限")
                return;
            }
            this.$refs.form.validate(async valid=>{ //表单验证
                if(valid){  //如果验证通过
                    let res;
                    if(this.info.isAdd){    //添加
                        res = await addRoie(this.forminfo)
                    }else{
                        res = await editRoie(this.forminfo)
                    }
                    if(res.code==200){
                        this.$message.success(res.msg);  //$mesage是Elemen-UI注入到vue实例中的属性
                        this.info.isShow = false;
                        this.get_roie_list();   //提交之后重新获取角色列表
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
                this.$refs.tree.setCheckedKeys([])
            }else{  //修改时的重置
                this.setinfo({...defaultItem})
            }
        },
        cancel(){
            this.forminfo = {...resetItem}
            this.$refs.tree.setCheckedKeys([])
        }   
    },
    components:{}
}

</script>

<style scoped>
</style>