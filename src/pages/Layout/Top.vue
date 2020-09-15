<template>
    <div class="header">
        <div class="lt">
            <el-button type="primary" @click="TOGGLE" v-if="iscollapse" size="small" class="toggle-btn" icon="el-icon-s-unfold"></el-button>
            <el-button type="primary" @click="TOGGLE" v-else size="small" class="toggle-btn" icon="el-icon-s-fold"></el-button>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left:20px">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button v-if="$route.path!='/index'" @click="$router.back()" type="danger" style="margin-left:20px"  size="mini" icon="el-icon-back" circle></el-button>
        </div>
        <div>
           <el-dropdown>
                <span class="el-dropdown-link">
                    {{username}}您好！<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="QUIT"><i class="el-icon-switch-button"></i>注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations,mapGetters } from 'vuex'
export default {
    data(){
        return{}
    },
    created(){},
    computed:{
        ...mapState(['iscollapse']),
        ...mapGetters({
            username:"user/username"
        })
    },
    methods:{
        ...mapMutations({
            TOGGLE:'TOGGLE',
            QUIT:"user/QUIT"
        })
    },
    components:{}
}

</script>

<style scoped>
.header{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items:center
}
.header .lt{
    display: flex;
    align-items:center;
}
</style>