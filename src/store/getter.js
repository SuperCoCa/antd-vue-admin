const getters = {
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  userInfo: state => state.user.userInfo,
  curMenu: state => state.menu.curMenu,
  curTab: state => state.menu.curTab,
}

export default getters