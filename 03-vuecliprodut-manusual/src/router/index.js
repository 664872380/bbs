import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import product from "../components/shopping/Product.vue"
import Self from "../views/Self.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/self',
    component: Self,
	children:[
		{
			path: 'product',
			component:product
			// component: () => import( '../components/shopping/Product.vue'),
		},
		{
			path: 'shoplist',
			component: () => import( '../components/shopping/ShopList.vue'),
		}
	]
  }
]
const router = new VueRouter({
	
  //路由模式影响路由初始化渲染
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
		console.log(to.path)
		if(to.path==="/self"){
			next("/self/product")
		}else{
			next()
		}
})

export default router
