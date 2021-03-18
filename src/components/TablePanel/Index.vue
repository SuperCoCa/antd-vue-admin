<template>
  <div class="table-panel">
    <div class="left-panel"><slot name="left"></slot></div>
    <div class="right-panel">
      <slot name="right"></slot>
      <a-button size="small" icon="sync" title="刷新" @click="handleRefresh"></a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablePanel',
  methods: {
    handleRefresh() {
      this.$emit('onRefresh')
    }
  }
}
</script>

<style scoped>
.table-panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.left-panel,
.right-panel {
  display: flex;
}
.right-panel {
  flex-direction: row-reverse;
}
</style>
