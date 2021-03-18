<template>
  <div class="tab-wrap">
    <a-tabs
      v-model="activeKey"
      type="editable-card"
      hide-add
      @edit="onEdit"
    >
      <a-tab-pane
        v-for="tab in tabs"
        :key="tab.fullPath"
        :tab="tab.meta.title"
        :closable="tab.name != 'home'"
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'MultiTabIndex',
  data() {
    return {
      fullPathList: [],
      activeKey: '',
      tabs: [],
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler: function (val) {
        this.activeKey = val.fullPath
        this.$store.dispatch('menu/SetCurTab', this.activeKey)

        this.$store.dispatch('menu/SetCurMenu', {name: this.$route.meta.menu})

        if (this.fullPathList.indexOf(val.fullPath) < 0) {
          this.fullPathList.push(val.fullPath)
          this.tabs.push(val)
        }
      }
    },
    activeKey: function (val) {
      this.$router.push({ path: val })
    }
  },
  created() {
    if (this.fullPathList.indexOf('/home') < 0) {
      this.fullPathList.unshift('/home')
      this.tabs.unshift({
        fullPath: '/home',
        name: 'home',
        meta: {
          title: '首页',
        }
      })
    }
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      this.tabs = this.tabs.filter(tab => tab.fullPath !== targetKey)
      this.fullPathList = this.fullPathList.filter(path => path != targetKey)
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath()
      }
    },
    selectedLastPath () {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1]
    },
  }
}
</script>

<style scoped>
.tab-wrap {
  position: relative;
  z-index: 1;
  padding: 12px 20px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
}

.tab-wrap >>> .ant-tabs-bar {
  margin-bottom: 0;
  border-bottom: 0;
}
.tab-wrap >>> .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  margin-right: 5px;
  border-color: #fafafa;
  border-radius: 8px;
}
.tab-wrap >>> .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab:hover,
.tab-wrap >>> .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
  border-color: #e6f7ff;
  background: #e6f7ff;
}
.tab-wrap >>> .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab:hover .ant-tabs-close-x,
.tab-wrap >>> .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active .ant-tabs-close-x {
  color: #1890ff;
  border-radius: 50%;
}
.tab-wrap >>> .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x:hover,
.tab-wrap >>> .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active .ant-tabs-close-x:hover {
  color: #fff;
  background: #c0c4cc;
}
</style>
