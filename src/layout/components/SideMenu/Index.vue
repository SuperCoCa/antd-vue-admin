<template>
  <div class="side-menu">
    <div class="logo">V</div>
    <a-menu
      @click="handleClick"
      :selectedKeys="selectedKey()"
    >
      <a-menu-item
        v-for="item in menuItems"
        :key="item.key"
      >
        <div>
          <svg-icon :icon-class="item.icon" v-if="item.icon" />
          <span>{{ item.name }}</span>
        </div>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { menuConfig } from '@/menu/index'

export default {
  name: "SideMenu",
  data() {
    return {
      menuItems: [],
    }
  },
  created() {
    this.getMenuItems()
  },
  methods: {
    getMenuItems() {
      const routes = this.$router.getRoutes()
      const menus = []
      for (let i in routes) {
        if (menus.indexOf(routes[i].meta.menu) < 0) menus.push(routes[i].meta.menu)
      }

      this.menuItems = menuConfig.filter(menu => {
        return menus.indexOf(menu.key) > -1
      })
    },
    selectedKey() {
      let item = this.$route.meta.menu ? this.$route.meta.menu : ''

      return [item]
    },
    handleClick({ key }) {
      this.menuItems.find(item => {
        if (item.key === key) {
          if (!item.sidebar) this.$router.push(item.path)
        }
      })

      this.$store.dispatch('menu/SetCurMenu', {name: key})
    }
  }
}
</script>

<style scoped>
.side-menu {
  width: 64px;
  color: rgba(255, 255, 255, .95);
  background: #282c34;
}

.logo {
  height: 64px;
}

.ant-menu {
  border-right: 0;
  color: rgba(255, 255, 255, .95);
  background: #282c34;
}
.ant-menu.ant-menu-vertical .ant-menu-item {
  margin: 0;
  height: 64px;
  line-height: 64px;
}
.ant-menu-item:hover {
  color: rgba(255, 255, 255, .95);
}
.ant-menu-item:active {
  background: transparent;
}
.ant-menu-item-selected {
  color: rgba(255, 255, 255, .95);
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background: #1890FF;
}

.ant-menu-item div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.ant-menu-item .svg-icon {
  margin-bottom: 5px;
}
.ant-menu-item span {
  line-height: 20px;
}
</style>