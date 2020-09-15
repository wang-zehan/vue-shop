import $axios from "@/common/http"
// 获取菜单列表
export async function getCategory(){
    let res = await $axios.get("/catelist?istree=1");
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
//添加菜单
export function addCategory(data){
    return $axios.post("/cateadd",data)
    
}
//修改菜单
export function editCategory(data){
    return $axios.post("/cateedit",data)
}
//删除菜单
export function delCategory(id){
    return $axios.post("/catedelete",{id})
}
