import { getRoie } from "@/requset/roie"
export default{
    namespaced:true,
    state:{
        roielist:[]
    },
    getters:{
        roielist:state => state.roielist
    },
    mutations:{
        SET_LIST(state,data){
            state.roielist = data 
        }
    },
    actions:{
        async get_roie_list({ commit }){
            let res = await getRoie();
            commit('SET_LIST',res)
        }
    }
}