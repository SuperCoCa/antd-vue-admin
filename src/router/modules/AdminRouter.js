import BasicLayout from '@/layout/BasicLayout'

const AdminRouter = {
  path: '/admin',
  name: 'admin',
  component: BasicLayout,
  redirect: '/admin/list',
  meta: {
    title: '管理员管理',
    menu: 'setting',
  },
  children: [
    {
      path: '/admin/list',
      name: 'admin_list',
      component: () => import('@/views/setting/admin/Index'),
      meta: {
        title: '管理员列表',
        menu: 'setting',
      }
    },
  ]
}

export default AdminRouter
