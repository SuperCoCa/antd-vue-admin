<template>
  <a-layout-header class="top-bar">
    <div>
      <a-icon
        v-if="collapsible"
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="handleCollapsed"
      ></a-icon>
    </div>
    <right-panel />
  </a-layout-header>
</template>

<script>
import RightPanel from './RightPanel'

export default {
  name: 'Topbar',
  components: {
    RightPanel,
  },
  props: {
    collapsed: {
      type: Boolean
    },
    collapsible: {
      type: Boolean
    }
  },
  methods: {
    handleCollapsed() {
      this.$emit('update:collapsed', !this.collapsed)
    }
  }
}
</script>

<style scoped>
.top-bar {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
}
</style>
