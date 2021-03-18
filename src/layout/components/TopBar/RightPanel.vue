<template>
  <div class="topbar-right">
    <div class="quick-tool">
      <span class="tool-btn"><svg-icon icon-class="topbarSearch" /></span>
    </div>
    <a-dropdown class="dropdown-btn">
      <div class="info">
        <img :src="fileUrl + userInfo.avatar" alt="头像" class="avatar">
        {{ userInfo.username }}
        <a-icon type="down" />
      </div>
      <a-menu slot="overlay" class="dropdown-menu">
        <a-menu-item>
          <span><svg-icon icon-class="topbarUser" /> 个人中心</span>
        </a-menu-item>
        <a-menu-item>
          <span><svg-icon icon-class="topbarLogout" /> 退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: 'RightPanel',
  data() {
    return {

    }
  },
  computed: {
    userInfo: function () {
      return this.$store.state.user.userInfo
    },
    fileUrl: function () {
      return process.env.VUE_APP_FILE_API
    }
  }
}
</script>

<style scoped>
.topbar-right {
  display: flex;
}

.quick-tool .tool-btn {
  padding: 0 10px;
}
.quick-tool .svg-icon {
  cursor: pointer;
}

.dropdown-btn {
  padding: 0 15px;
  cursor: pointer;
  transition: all .3s ease;
}
.dropdown-btn:hover {
  background-color: rgba(0, 0, 0, .03);
}

.avatar {
  margin-right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.dropdown-menu .ant-dropdown-menu-item span {
  display: flex;
  align-items: center;
}
.dropdown-menu .ant-dropdown-menu-item .svg-icon {
  margin-right: 10px;
}
</style>
