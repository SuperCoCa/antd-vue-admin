import Vue from 'vue'
import App from './App.vue'

// 引入vue-router
import router from './router'

// 引入store
import store from './store'

// 引入icons
import '@/icons'

// 引入权限判断
import '@/permission'

// 引入Antd组件
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
