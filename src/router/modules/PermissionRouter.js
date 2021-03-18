import BasicLayout from '@/layout/BasicLayout'

const PermissionRouter = {
  path: '/permission',
  name: 'permission',
  component: BasicLayout,
  redirect: '/role/list',
  meta: {
    title: '权限管理',
    menu: 'setting',
  },
  children: [
    {
      path: '/role/list',
      name: 'role_list',
      component: () => import('@/views/setting/role/Index'),
      meta: {
        title: '角色列表',
        menu: 'setting',
      }
    },
    {
      path: '/menu/list',
      name: 'menu_list',
      component: () => import('@/views/setting/menu/Index'),
      meta: {
        title: '菜单列表',
        menu: 'setting',
      }
    },
    {
      path: '/permission/list',
      name: 'permission_list',
      component: () => import('@/views/setting/permission/Index'),
      meta: {
        title: '权限列表',
        menu: 'setting',
      }
    }
  ]
}

export default PermissionRouter
