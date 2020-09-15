import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: ()=>import('../pages/Layout'),
      meta:{
        title:'首页ya',
        needLogin:true
      },
      redirect:"/index",
      children:[
        {
          path:'/index',
          component:()=>import('../pages'),
          meta:{
            title:'后台首页',
            needLogin:true
          }
        },
        {
          path:'/shop/banner',
          component:()=>import('../pages/Shop/Banner'),
          meta:{
            title:'轮播管理',
            needLogin:true
          }
        },
        {
          path:'/shop/category',
          component:()=>import('../pages/Shop/Category'),
          meta:{
            title:'商品分类',
            needLogin:true
          }
        },
        {
          path:'/shop/goods',
          component:()=>import('../pages/Shop/Goods'),
          meta:{
            title:'商品管理',
            needLogin:true
          }
        },
        {
          path:'/shop/member',
          component:()=>import('../pages/Shop/Member'),
          meta:{
            title:'会员管理',
            needLogin:true
          }
        },
        {
          path:'/shop/seckill',
          component:()=>import('../pages/Shop/Seckill'),
          meta:{
            title:'秒杀管理',
            needLogin:true
          }
        },
        {
          path:'/shop/specs',
          component:()=>import('../pages/Shop/Specs'),
          meta:{
            title:'商品规格',
            needLogin:true
          }
        },
        {
          path:'/system/menu',
          component:()=>import('../pages/System/Menu'),
          meta:{
            title:'菜单管理',
            needLogin:true
          }
        },
        {
          path:'/system/roie',
          component:()=>import('../pages/System/Roie'),
          meta:{
            title:'角色管理',
            needLogin:true
          }
        },
        {
          path:'/system/user',
          component:()=>import('../pages/System/User'),
          meta:{
            title:'管理员管理',
            needLogin:true
          }
        }
      ]
    },
    {
      path:'/login',
      component:()=>import('../pages/Login')
    }
  ]
})

router.beforeEach(function(to,from,next){ //路由前置守卫
  if(to.path == '/login'){  
    document.title = to.meta.title
    next();
  }else{
    if(localStorage.getItem("userinfo")){
      let whiteList = store.getters['user/menus_url'];
      whiteList.push("/index");
      if(whiteList.includes(to.path)){
        document.title = to.meta.title;
        next();
      }
    }else{
      next('/login')
    }
  }
})
export default router