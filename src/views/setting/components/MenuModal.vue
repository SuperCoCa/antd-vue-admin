<template>
  <a-modal
    title="分配权限"
    :visible="menuModalVisible"
    :maskClosable="false"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <a-tree
      class="menu-tree"
      v-model="checkedKeys"
      :checkable="true"
      :expandedKeys="expandedKeys"
      :tree-data="menuList"
      :replaceFields="{ title: 'title', key: 'id' }"
      @expand="handleExpand"
      @select="handleSelect"
    ></a-tree>
  </a-modal>
</template>

<script>
import { getMenuList } from '@/api/setting/menu'
import { getAdminMenu, setAdminMenu } from '@/api/setting/admin'
import { getRoleMenu, setRoleMenu } from '@/api/setting/role'

export default {
  name: 'MenuModal',
  props: {
    menuModalVisible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      require: true,
    },
    module: {
      type: String,
      require: true,
    }
  },
  data() {
    return {
      rawMenu: {},
      menuList: [],
      checkedKeys: [],
      loading: false,
      expandedKeys: [],
    }
  },
  created() {
    this.getData()
  },
  watch: {
    menuModalVisible(val) {
      if (!val) return false
      
      switch (this.module) {
        case 'admin':
          this.getAdminMenu()
          break
        case 'role':
          this.getRoleMenu()
          break
        default:
          return false
      }
    },
    menuList(val) {
      this.getRawMenu(val)
    }
  },
  methods: {
    getData() {
      this.loading = true
      getMenuList().then(res => {
        this.menuList = res.data
        this.loading = false
      }).catch(err => {
        this.$message.error(err)
        this.loading = false
      })
    },
    getRawMenu(menu) {
      menu.forEach(item => {
        this.rawMenu[item.id] = {
          pid: item.pid,
          children: item.children ? true : false,
        }
        if (item.children) this.getRawMenu(item.children)
      })
    },
    getAdminMenu() {
      getAdminMenu({ id: this.id }).then(res => {
        res.data.forEach(item => {
          this.checkedKeys.push(item.id)
        })

        this.getExpandedKeys(this.checkedKeys)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    getRoleMenu() {
      getRoleMenu({ id: this.id }).then(res => {
        res.data.forEach(item => {
          this.checkedKeys.push(item.id)
        })

        this.getExpandedKeys(this.checkedKeys)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleCancel() {
      this.checkedKeys = []
      this.expandedKeys = []
      this.$emit('cancel')
    },
    handleOk() {
      // 获取子节点
      switch (this.module) {
        case 'admin':
          this.setAdminMenu(this.checkedKeys)
          break
        case 'role':
          this.setRoleMenu(this.checkedKeys)
          break
        default:
          return false
      }
    },
    setAdminMenu(menuIds) {
      setAdminMenu({
        id: this.id,
        menu: menuIds
      }).then(res => {
        this.$message.success(res.message)
        this.handleCancel()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    setRoleMenu(menuIds) {
      setRoleMenu({
        id: this.id,
        menu: menuIds
      }).then(res => {
        this.$message.success(res.message)
        this.handleCancel()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelect(id, event) {
      if (event.node.dataRef.children == undefined) return;
      event.node.onExpand()
    },
    handleExpand(keys) {
      this.expandedKeys = keys
    },
    getExpandedKeys(checkedKeys) {
      checkedKeys.forEach(item => {
        if (this.rawMenu[item] && this.rawMenu[item].pid) {
          this.expandedKeys.push(this.rawMenu[item].pid)
          
          this.getExpandedKeys([this.rawMenu[item].pid])
        }
      })
    }
  }
}
</script>
