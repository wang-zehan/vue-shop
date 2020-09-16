import $axios from "@/common/http"
// 获取菜单列表
export async function getSpecs(page=1,size=10){
    let res = await $axios.get("/specslist",{
        params:{
            page,size
        }
    });
    if(res.code==200 && res.list){
        return res.list
        console.log()
    }else{
        return [];
    }
}
//添加菜单
export function addSpecs(data){
    return $axios.post("/specsadd",data)
    
}
//修改菜单
export function editSpecs(data){
    return $axios.post("/specsedit",data)
}
//删除菜单
export function delSpecs(id){
    return $axios.post("/specsdelete",{id})
}
//获取管理员个数
export async function getTotal(){
    let res = await $axios.get("/specscount")
    return res.list[0].total
}
//请求登录
export function Login(data){
    return $axios.post("/specslogin",data)
}
