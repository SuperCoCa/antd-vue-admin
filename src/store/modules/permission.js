import { asyncRouterMap, constantRouterMap } from "../../router";

const state = {
  routers: constantRouterMap,
  addRouters: []
}

const mutations = {
  SET_ROUTERS: function (state, payload) {
    state.addRouters = payload
    state.routers = constantRouterMap.concat(payload)
  }
}

const actions = {
  GenerateRoutes({ commit }, payload) {
    return new Promise(resolve => {
      const { menus } = payload
      const accessedRouters = asyncRouterMap.filter(router => {
        if (hasPermission(menus, router)) {
          if (router.children && router.children.length > 0) {
            router.children = router.children.filter(childRouter => {
              if (hasPermission(menus, childRouter)) return childRouter

              return false
            })

            return router
          } else {
            return router
          }
        }

        return false
      })
      
      sortRouters(accessedRouters)
      commit('SET_ROUTERS', accessedRouters)

      resolve()
    })
  }
}

function hasPermission(menus, router) {
  if (router.name) {
    let menuInfo = getMenu(router.name, menus)
    if (menuInfo) {
      if (menuInfo.title) router.meta.title = menuInfo.title
      if (menuInfo.icon) router.meta.icon = menuInfo.icon
      if (menuInfo.sort) router.meta.sort = menuInfo.sort

      return true
    } else {
      return false
    }
  }

  return true
}

function getMenu(name, menus) {
  for (let i = 0; i < menus.length; i++) {
    if (name === menus[i].name) return menus[i]
  }

  return null
}

function sortRouters(routers) {
  for (let i in routers) {
    if (routers.children && routers.children.length > 0) {
      routers.children.sortRouters(routers.children)
    }
  }

  routers.sort(sortFunc)
}

function sortFunc(a, b) {
  return b['sort'] - a['sort']
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
