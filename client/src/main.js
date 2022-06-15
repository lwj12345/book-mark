import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
import 'default-passive-events'
// import VueAxios from 'vue-axios'
// import http from './network/request'
// axios.defaults.baseURL='http://127.0.0.1:8080';
// Vue.use(VueAxios, axios);
import SocketIO from "socket.io-client";
import vueSccketIO from "vue-socket.io";
Vue.use(
  new vueSccketIO({
    debug: true,
    connection: SocketIO("ws://localhost:3000")
  })
);

Vue.prototype.$axios=axios;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
