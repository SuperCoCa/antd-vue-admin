<template>
  <a-layout class="wrapper">
    <side-menu />
    <side-bar :sidebarItems="sidebarItems" :collapsed="collapsed" :selectedKeys.sync="selectedKeys" />
    <a-layout>
      <top-bar :collapsed.sync="collapsed" :collapsible="collapsible" />
      <multi-tab />
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import MultiTab from './components/MultiTab/Index'
import SideBar from './components/SideBar/Index'
import SideMenu from './components/SideMenu/Index'
import TopBar from './components/TopBar/Index'
import { menuConfig } from '@/menu/index'

export default {
  name: 'BasicLayout',
  components: {
    MultiTab,
    SideBar,
    SideMenu,
    TopBar,
  },
  data() {
    return {
      collapsed: false,
      collapsible: null,
      sidebarItems: [],
      selectedKeys: [],
    }
  },
  computed: {
    curMenu() {
      return this.$store.state.menu.curMenu
    }
  },
  watch: {
    curMenu: {
      immediate: true,
      handler: function (val) {
        // 判断是否含有主菜单
        let hasSidebar = this.hasSidebar(val)

        if (!hasSidebar) this.selectedKeys = []
        this.collapsed = !hasSidebar
        this.collapsible = hasSidebar
      }
    }
  },
  methods: {
    hasSidebar(menu) {
      for (let i in menuConfig) {
        if (menuConfig[i].key == menu) {
          return menuConfig[i].sidebar == undefined ? true : menuConfig[i].sidebar
        }
      }

      return true
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}

.header {
  display: flex;
  padding: 0;
}
.header .logo {
  width: 200px;
  color: #fff;
}
.header .topbar {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 200px);
}

.ant-layout-content {
  padding: 20px;
}
</style>
