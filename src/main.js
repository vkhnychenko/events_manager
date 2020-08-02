import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin.js'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import 'datejs'
import 'material-icons/iconfont/material-icons.css'


axios.defaults.baseURL = 'http://127.0.0.1'
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  if (error.response.status === 401) {
    if (Object.prototype.hasOwnProperty.call(error.response.data ,'messages')) {
      if (error.response.data.messages[0].message === "Token is invalid or expired") {
        store.dispatch('logout')
        router.push('/login?message=unauthorized')
      }
    }
    return Promise.reject(error)
  }
  return Promise.reject(error)
})

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.component('Paginate', Paginate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
