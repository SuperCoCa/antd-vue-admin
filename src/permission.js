import router from './router'
import store from './store'

// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/auth'
import { message } from 'ant-design-vue'

const whiteList = ['/login'] // 不重定向白名单

NProgress.configure({
  easing: 'ease',
  speed: 600,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (JSON.stringify(store.getters.userInfo) == '{}') {
        store.dispatch('user/GetInfo').then(response => {
          const menus = response.data.menu
          
          store.dispatch('permission/GenerateRoutes', { menus }).then(() => {
            store.getters.addRouters.forEach(r => {
              router.addRoute(r)
            })
            
            next({ ...to, replace: true })
          })
        }).catch(err => {
          message.error(err)
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})