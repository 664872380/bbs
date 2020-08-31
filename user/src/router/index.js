import Vue from 'vue'
import VueRouter from 'vue-router'
import myhead from "../components/mine/myhead.vue"
Vue.use(VueRouter)

  const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: myhead,
    children:[
      {
        path:'/',
        component: () => import('../components/index/shouye.vue')
      },
      {
        path:'xiaoce',
        component: () => import('../components/mine/xiaoce.vue')
      },
      {
        path:'feidian',
        component: () => import('../components/mine/feidian.vue')
      }
    ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
