import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Nofind from '../views/404.vue'
import login from '../views/Login.vue'
import addbook from '../views/addbook.vue'
import Talk from '../views/talk.vue'
import editInfo from '../views/editInfo.vue'
import detail from '../views/detail.vue'
import message from '../views/message.vue'
import myProduct from '../views/myProduct.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 默认路径
    redirect: to => {
      return '/login'
    }
  },,{path: '/home',name: 'home',component: Home},
    { path: '/register', name: 'register', component: Register }, 
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
  mode: 'hash',
  // base: '/',
  routes
})

// 添加路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.token ? true : false;
//   if (to.path == "/login" || to.path == "/register") {
//     next(); 
//   } else {
//     isLogin ? next() : next("/login");
//   }
// })
export default router
