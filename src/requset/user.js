import $axios from "@/common/http"
// 获取菜单列表
export async function getUser(page=1,size=10){
    let res = await $axios.get("/userlist",{
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
export function addUser(data){
    return $axios.post("/useradd",data)
    
}
//修改菜单
export function editUser(data){
    return $axios.post("/useredit",data)
}
//删除菜单
export function delUser(uid){
    return $axios.post("/userdelete",{uid})
}
//获取管理员个数
export async function getTotal(){
    let res = await $axios.get("/usercount")
    return res.list[0].total
}
//请求登录
export function Login(data){
    return $axios.post("/userlogin",data)
}
