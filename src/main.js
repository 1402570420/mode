import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import axios from 'axios'
import VueAxios from 'vue-axios' 

axios.defaults.baseURL="http://192.168.1.188"
axios.interceptors.request.use(function(config){
  //携带凭证
  config.headers['Authorization'] = sessionStorage.getItem("Token");
  return config
},function(error){
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
  return response
},function(error){
  var url =error.config.url.toLocaleLowerCase();
  if (error.response.status ===401 && !url.endsWith("oauth/authenticate")) {
    router.replace({name:"Login",query:{retumUrl:router.fullPath}})
  }
  return Promise.reject(error)//返回错误
})



Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
