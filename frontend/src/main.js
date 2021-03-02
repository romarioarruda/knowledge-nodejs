import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'
import router from './config/router'

import './config/bootstrap'
import './config/msgs'

import store from './config/store'

Vue.config.productionTip = false

//TEMPORARIO
require('axios').defaults.headers.authorization = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlJvbcOhcmlvIEFycnVkYSIsImVtYWlsIjoicm9tYXJpb0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjE0NjQyNDE5LCJleHAiOjE2MTQ3Mjg4MTl9.FAnCXMaZ2MH5ibW9BapFGvPb2UY4AY78DGCsORrflZk'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')