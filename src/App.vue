<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'App',
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  color: rgba(0, 0, 0, .65);
}

#nprogress .bar {
  background: #1890FF !important;
}

.table .operation-btn {
  padding: 0;
  height: 22px;
}
.table .operation-btn:not(:last-child) {
  margin-right: 10px;
}
</style>
