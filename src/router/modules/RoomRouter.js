import BasicLayout from '@/layout/BasicLayout'

const RoomRouter = {
  path: '/room',
  name: 'room',
  component: BasicLayout,
  redirect: '/room/list',
  meta: {
    title: '一级A',
    menu: 'system',
  },
  children: [
    {
      path: '/room/list',
      name: 'room_list',
      component: () => import('@/views/realtime/room/Index'),
      meta: {
        title: '二级A',
        menu: 'system',
      }
    }
  ]
}

export default RoomRouter
