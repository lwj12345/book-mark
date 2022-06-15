import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const types = {
  SET_USER: 'SET_USER', // 用户信息
  // ALL_PRODUCTS:'ALL_PRODUCTS'
}
//定义应用的状态数据
const state = { // 需要维护的状态
  user: JSON.parse(sessionStorage.getItem("UserInfo")) || [{}],   // 存储用户信息
  allproduct:{},
  product:JSON.parse(sessionStorage.getItem("product")) || [{}]
}

const getters = {
  user: state => state.user,
  allproduct:state => state.allproduct,
  product:state =>state.product
}
const mutations = {
  [types.SET_USER](state, user) {
    //user存在的话将user存到state
      state.user = user
      sessionStorage.setItem("UserInfo", JSON.stringify(user))
  },
 ALL_PRODUCTS(state, allproduct) {
    state.allproduct = allproduct;
    sessionStorage.setItem("allproduct", JSON.stringify(allproduct))
  },
  get_product(state,product){
    state.product = product;
    sessionStorage.setItem("product", JSON.stringify(product))
}
}
 //用于提交异步请求，处理完异步请求后再提交到mutation
const actions = {
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_USER, null)
  },
  getAllproduct:({ commit },allproduct) => {
    commit('ALL_PRODUCTS',allproduct)
},
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
