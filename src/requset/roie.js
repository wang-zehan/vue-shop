import $axios from "@/common/http"
// 获取菜单列表
export async function getRoie(){
    let res = await $axios.get("/rolelist");
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
//添加菜单
export function addRoie(data){
    return $axios.post("/roleadd",data)
    
}
//修改菜单
export function editRoie(data){
    return $axios.post("/roleedit",data)
}
//删除菜单
export function delRoie(id){
    return $axios.post("/roledelete",{id})
}
