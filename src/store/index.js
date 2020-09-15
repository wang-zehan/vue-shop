import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import menu from "./modules/menu"
import roie from "./modules/roie"
import user from "./modules/user"
import category from "./modules/category"
let store = new Vuex.Store({
    state:{
        iscollapse:false    //是否折叠
    },
    mutations:{
        TOGGLE(state){
            state.iscollapse = !state.iscollapse
        }
    },
    modules:{
        menu,roie,user,category
    }
})
export default store