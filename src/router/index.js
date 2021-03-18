import Vue from 'vue'
import VueRouter from 'vue-router'

import BasicLayout from '@/layout/BasicLayout'

import RoomRouter from './modules/RoomRouter'
import AdminRouter from './modules/AdminRouter'
import PermissionRouter from './modules/PermissionRouter'
import SettingRouter from './modules/SettingRouter'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/auth/Login'),
    hidden: true,
  },
  {
    path: '',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/Index'),
        meta: {
          title: '首页',
          menu: 'home'
        },
      }
    ]
  },
]

export const asyncRouterMap = [
  AdminRouter,
  PermissionRouter,
  SettingRouter,
  RoomRouter,
]

export default new VueRouter({
  mode: 'history',
  routes: constantRouterMap
})