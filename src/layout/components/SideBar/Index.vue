<template>
  <a-layout-sider v-model="collapsed" :trigger="null" collapsible collapsedWidth="0">
    <div class="logo">SYSTEM</div>
    <a-menu
      class="menu"
      mode="inline"
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      @openChange="openChange"
    >
      <template v-for="item in sidebarItems">
        <template v-if="!item.hidden">
          <a-menu-item
            v-if="!item.children || item.children.length === 0"
            :key="item.path"
            class="menu-item"
            @click="handleClick"
          >
            <svg-icon :icon-class="item.meta.icon" />
            {{ item.meta.title }}
          </a-menu-item>
          <a-sub-menu v-else :key="item.path" class="sub-menu-item">
            <span slot="title">
              <svg-icon :icon-class="item.meta.icon" />
              {{ item.meta.title }}
            </span>
            <a-menu-item
              v-for="subItem in item.children"
              :key="subItem.path"
              @click="handleClick"
            >
              <svg-icon :icon-class="subItem.meta.icon" />
              {{ subItem.meta.title }}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'SidebarIndex',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    selectedKeys: {
      type: Array,
      default: function () {
        return []
      },
    }
  },
  data() {
    return {
      sidebarItems: [],
      openKeys: [],
    }
  },
  watch: {
    '$store.state.menu.curMenu': function (val) {
      // 获取主菜单
      this.getSidebarItems(val)
    },
    '$store.state.menu.curTab': function (val) {
      const pSideBar = this.$route.matched[0].path
      if (this.openKeys.indexOf(pSideBar) < 0) this.openKeys.push(pSideBar)
      this.$emit('update:selectedKeys', [val])
    }
  },
  created() {
    this.initSidebar()
  },
  methods: {
    initSidebar() {
      // 设置展开菜单
      this.openKeys = [this.$route.matched[0].path]
      // 设置选中菜单
      this.$emit('update:selectedKeys', [this.$route.path])

      let menu = this.$route.meta.menu ? this.$route.meta.menu : ''
      // 设置当前选中的主菜单
      this.$store.dispatch('menu/SetCurMenu', {name: menu})
      // 获取当前菜单下的路由
      this.getSidebarItems(menu)
    },
    openChange(keys) {
      this.openKeys = keys
    },
    getSidebarItems(menu) {
      let routers = this.$store.state.permission.routers

      let items = []

      for (let i in routers) {
        if (routers[i].meta && routers[i].meta.menu == menu) {
          items.push(routers[i])
        }
      }

      this.sidebarItems = items
    },
    handleClick({key}) {
      this.$emit('update:selectedKeys', [key])
      this.$router.push(key)
    }
  }
}
</script>

<style scoped>
.logo {
  height: 64px;
  color: #1890FF;
  background: #fff;
}

.ant-layout-sider {
  position: relative;
  z-index: 20;
  overflow-y: scroll;
  background: #fff;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}
.ant-layout-sider::-webkit-scrollbar {
  width: 6px;
  height: 3px;
}
.ant-layout-sider::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: #1890ff;
}
.ant-layout-sider::-webkit-scrollbar-track {
  border-radius: 5px;
  background: transparent;
}

.ant-menu {
  border-right: 0;
}
.ant-menu-item {
  margin-left: 6px;
}
.ant-menu-vertical .ant-menu-item {
  margin-top: 0;
}
.sub-menu-item >>> span,
.sub-menu-item >>> .ant-menu-item {
  display: flex;
  align-items: center;
}
.sub-menu-item >>> span svg,
.sub-menu-item >>> .ant-menu-item svg {
  margin-right: 5px;
}
.sub-menu-item >>> .ant-menu-item,
.sub-menu-item >>> .ant-menu-submenu-title {
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
}
.sub-menu-item >>> .ant-menu-item {
  width: auto;
}
.sub-menu-item >>> .ant-menu-submenu-title {
  width: 100%;
}
.ant-menu-submenu-selected >>> span svg {
  color: #1890ff;
}
.ant-menu-inline .ant-menu-item-selected::after {
  display: none;
}
</style>
