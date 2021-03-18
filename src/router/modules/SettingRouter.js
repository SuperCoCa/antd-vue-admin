import BasicLayout from '@/layout/BasicLayout'

const SettingRouter = {
  path: '/setting',
  name: 'setting',
  component: BasicLayout,
  redirect: '/setting/list',
  meta: {
    title: '系统设置',
    menu: 'setting',
  },
  children: [
    {
      path: '/setting/list',
      name: 'setting_list',
      component: () => import('@/views/setting/setting/Index'),
      meta: {
        title: '设置列表',
        menu: 'setting',
      }
    },
  ]
}

export default SettingRouter
