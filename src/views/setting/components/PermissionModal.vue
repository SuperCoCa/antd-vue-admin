<template>
  <a-modal
    title="分配权限"
    :visible="permissionModalVisible"
    :maskClosable="false"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <a-tree
      class="permission-tree"
      v-model="checkedKeys"
      :checkable="true"
      :expandedKeys="expandedKeys"
      :tree-data="permissionList"
      :replaceFields="{ title: 'name', key: 'id' }"
      @expand="handleExpand"
      @select="handleSelect"
    ></a-tree>
  </a-modal>
</template>

<script>
import { getPermissionList } from '@/api/setting/permission'
import { getAdminPermission, setAdminPermission } from '@/api/setting/admin'
import { getRolePermission, setRolePermission } from '@/api/setting/role'

export default {
  name: 'PermissionModal',
  props: {
    permissionModalVisible: {
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
      rawPermission: {},
      permissionList: [],
      checkedKeys: [],
      loading: false,
      expandedKeys: [],
    }
  },
  created() {
    this.getData()
  },
  watch: {
    permissionModalVisible(val) {
      if (!val) return false
      
      switch (this.module) {
        case 'admin':
          this.getAdminPermission()
          break
        case 'role':
          this.getRolePermission()
          break
        default:
          return false
      }
    },
    permissionList(val) {
      this.getRawPermission(val)
    }
  },
  methods: {
    getData() {
      this.loading = true
      getPermissionList().then(res => {
        this.permissionList = res.data
        this.loading = false
      }).catch(err => {
        this.$message.error(err)
        this.loading = false
      })
    },
    getRawPermission(permission) {
      permission.forEach(item => {
        this.rawPermission[item.id] = {
          pid: item.pid,
          children: item.children ? true : false,
        }
        if (item.children) this.getRawPermission(item.children)
      })
    },
    getAdminPermission() {
      getAdminPermission({ id: this.id }).then(res => {
        res.data.forEach(item => {
          this.checkedKeys.push(item.id)
        })

        this.getExpandedKeys(this.checkedKeys)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    getRolePermission() {
      getRolePermission({ id: this.id }).then(res => {
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
      const permissionIds = this.checkedKeys.filter(item => this.rawPermission[item] && !this.rawPermission[item].children)

      switch (this.module) {
        case 'admin':
          this.setAdminPermission(permissionIds)
          break
        case 'role':
          this.setRolePermission(permissionIds)
          break
        default:
          return false
      }
    },
    setAdminPermission(permissionIds) {
      setAdminPermission({
        id: this.id,
        permission: permissionIds
      }).then(res => {
        this.$message.success(res.message)
        this.handleCancel()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    setRolePermission(permissionIds) {
      setRolePermission({
        id: this.id,
        permission: permissionIds
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
        if (this.rawPermission[item] && this.rawPermission[item].pid) {
          this.expandedKeys.push(this.rawPermission[item].pid)
          
          this.getExpandedKeys([this.rawPermission[item].pid])
        }
      })
    }
  }
}
</script>
