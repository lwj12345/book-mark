import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Nofind from '../views/404'
import login from '../views/Login'
import addbook from '../views/addbook'
import Talk from '../views/talk'
import editInfo from '../views/editInfo'
import detail from '../views/detail'
import message from '../views/message'
import myProduct from '../views/myProduct'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },{
    path: '/home',
    name: 'home',
    component: Home
  },{ path: '/register', name: 'register', component: Register }, 
    { path: '*', name: '/404', component: Nofind },
    { path: '/login', name: 'login', component: login },
    { path: '/addbook', name: 'addbook', component: addbook },
    { path: '/talk', name: 'talk', component: Talk },
    { path: '/editInfo', name: 'editInfo', component: editInfo },
    { path: '/detail', name: 'detail', component: detail },
    { path: '/message', name: 'message', component: message },
    { path: '/myProduct', name: 'myProduct', component: myProduct },

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 添加路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.eleToken ? true : false;
//   if (to.path == "/login" || to.path == "/register") {
//     next(); 
//   } else {
//     isLogin ? next() : next("/login");
//   }
// })
export default router
