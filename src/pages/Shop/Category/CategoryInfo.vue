<template>
    <div>
        <!-- :visible.sync="info.isShow" 是否显示弹框 -->
        <el-dialog :title="info.isAdd ? '添加分类':'修改分类'" @close="cancel" :visible.sync="info.isShow" width="40%">
            <el-form :model="forminfo" ref="form" :rules="rules" label-width="180px">
                <el-form-item  label="上级分类" >
                     <el-select v-model="forminfo.categorylist" placeholder="请选择">
                        <el-option v-for="item in categorylist" :key="item.id"  :label="item.catename" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称" prop="catename">
                    <el-input v-model="forminfo.catename" placeholder="请输入分类名"></el-input>
                </el-form-item>
                <el-form-item label="分类图片">
                    <!-- action属性是如果是文件先行，这个属性就是上传地址;limit属性是限制上传最多数量;
                    auto-upload设置为false时,设置不是文件先行;on-preview点击文件列表中已上传的文件时的钩子;
                    file-list存放所有的文件信息 -->
                    <el-upload
                        action=""
                        :auto-upload="false"
                        list-type="picture-card"
                        :limit="1"
                        :on-preview="see"
                        :on-change="change"
                        :file-list="filelist"
                        :on-remove="remove"
                       >
                            <i slot="default"  class="el-icon-plus"></i>
                    </el-upload>
                    <!-- :visible.sync是否点击放大图片预览;append-to-body dialog自身是否插入至body元素上，嵌套的dialog必须指定该属性并赋值为true -->
                    <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
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
import { addCategory,editCategory } from "@/requset/category"
import { mapGetters,mapActions } from  "vuex"
let defaultItem ={
    pid:0,
    catename:"",
    img:"",
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
            dialogVisible:false,
            dialogImageUrl:"",
            forminfo:{...defaultItem},
            rules:{ //验证规则对象
                catename:[ { required: true, message: '必填！', trigger: 'blur' }]
            },
            filelist:[]
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
            this.get_category_list()
        }
    },
    methods:{
        see(file){  //filr返回参数是文件的信息及地址
            this.dialogVisible = true;
            this.dialogImageUrl = file.url  //url是JS生成的预览地址
        },
        change(file,fileList){  //file是一个文件的信息，fileList是好多个文件信息
            console.log(file);
            this.forminfo.img = file.raw;   //raw是file参数中带的原生的文件信息 
        },
        remove(file,fileList){
            this.forminfo.img = ""
        },
        ...mapActions({
            get_category_list:"category/get_category_list"
        }),
        setinfo(val){
            if(val.img){
                this.filelist = [{
                    name:val.catename,
                    url:this.$host+val.img
                }];
            };
            // if(val.children){
            //     delete val.children
            // };
            val.children ? delete val.children : "";
            defaultItem = {...val};
            this.forminfo = {...val}
        },
        async submit(){
            this.$refs.form.validate(async valid=>{ //表单验证
                if(valid){  //如果验证通过
                    let res;
                    //需要提交FormDate类型
                    let fd = new FormData;
                    for(let k in this.forminfo){
                        fd.append(k,this.forminfo[k])
                    }
                    if(this.info.isAdd){    //添加
                        res = await addCategory(fd)
                    }else{
                        res = await editCategory(fd)
                    }
                    if(res.code==200){
                        this.$message.success(res.msg);  //$mesage是Elemen-UI注入到vue实例中的属性
                        this.info.isShow = false;
                        this.get_category_list();
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
            this.forminfo = {...resetItem};
            this.filelist = []
        }   
    },
    components:{}
}

</script>

<style scoped>
</style>