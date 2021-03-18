<template>
  <a-card style="width: 100%">
    <filter-bar :query="query" :propName="propName" :extraConfig="extraConfig" @handleSearch="getData" />
    <table-panel @onRefresh="getData">
      <template slot="left">
        <a-button type="primary" @click="handleAdd">添加</a-button>
      </template>
    </table-panel>
    <a-table
      class="table"
      size="middle"
      :bordered="true"
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :locale="{ emptyText: '暂无数据' }"
      :rowKey="record => record.id"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template slot="status" slot-scope="text, record">
        <a-switch :checked="record.status == 1 ? true : false" @click="handleChangeStatus(record)" :disabled="record.id === 1" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button type="link" class="operation-btn" @click="handleEdit(record)" :disabled="record.id === 1">编辑</a-button>
        <a-button type="link" class="operation-btn" @click="handleAssignPermission(record)" :disabled="record.id === 1">权限</a-button>
        <a-button type="link" class="operation-btn" @click="handleAssignMenu(record)" :disabled="record.id === 1">菜单</a-button>
        <a-button type="link" class="operation-btn" @click="handleDelete(record)" :disabled="record.id === 1">删除</a-button>
      </template>
    </a-table>
    <role-form-modal
      :roleFormModalVisible="roleFormModalVisible"
      :isEdit="isEdit"
      :formData="formData"
      @cancel="handleCancelForm"
      @submit="handleSubmitForm"
    />
    <permission-modal
      :permissionModalVisible="permissionModalVisible"
      :id="editId"
      module="role"
      @cancel="handleCancelPermissionModal"
    />
    <menu-modal
      :menuModalVisible="menuModalVisible"
      :id="editId"
      module="role"
      @cancel="handleCancelMenuModal"
    />
  </a-card>
</template>

<script>
import FilterBar from '@/components/FilterBar/Index'
import MenuModal from '../components/MenuModal'
import PermissionModal from '../components/PermissionModal'
import RoleFormModal from './components/RoleFormModal'
import TablePanel from '@/components/TablePanel/Index'
import { roleIndexConfig } from '@/config/filterBar/role.js'
import {
  getList,
  createRole,
  editRole,
  deleteRole,
  changeStatus
} from '@/api/setting/role'
import { pagination } from '@/mixins/pagination'

export default {
  name: 'RoleIndex',
  mixins: [pagination],
  components: {
    FilterBar,
    MenuModal,
    PermissionModal,
    RoleFormModal,
    TablePanel,
  },
  data() {
    return {
      query: {},
      propName: ['name', 'status'],
      extraConfig: roleIndexConfig,
      data: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 80
        },
        {
          title: '角色名',
          dataIndex: 'name'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          width: 80
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 200,
        },
      ],
      loading: false,
      roleFormModalVisible: false,
      isEdit: false,
      formData: {},
      permissionModalVisible: false,
      menuModalVisible: false,
      editId: null
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getList(this.query).then(res => {
        this.data = res.data
        this.loading = false
      }).catch(err => {
        this.$message.error(err)
        this.loading = false
      })
    },
    handleAdd() {
      this.isEdit = false
      this.roleFormModalVisible = true
      this.formData = Object.assign({})
    },
    handleAssignPermission(record) {
      this.permissionModalVisible = true
      this.editId = record.id
    },
    handleAssignMenu(record) {
      this.menuModalVisible = true
      this.editId = record.id
    },
    handleEdit(record) {
      this.isEdit = true
      this.roleFormModalVisible = true
      this.formData = Object.assign({}, record)
    },
    handleChangeStatus(record) {
      let _this = this
      this.$confirm({
        title: '是否' + (record.status ? '禁用' : '启用') + '该角色？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          changeStatus({
            id: record.id,
            status: !record.status,
          }).then(res => {
            if (res.data.res) {
              _this.$message.success('修改成功')
              record.status = !record.status
            } else {
              _this.$message.error('修改失败')
            }
          }).catch(err => {
            _this.$message.error(err)
          })
        },
        onCancel() {},
      })
    },
    handleDelete(record) {
      let _this = this
      this.$confirm({
        title: '是否确认删除当前项？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          deleteRole({ id: record.id }).then(res => {
            if (!res.code) {
              _this.$message.success('删除成功')
              _this.getData()
            } else {
              _this.$message.error('删除失败')
            }
          }).catch(err => {
            _this.$message.error(err)
          })
        },
        onCancel() {},
      })
    },
    handleCancelForm() {
      this.roleFormModalVisible = false
    },
    handleSubmitForm(form) {
      if (this.isEdit) {
        editRole(form).then(res => {
          this.handleAfterSubmit(res)
        }).catch(err => {
          this.$message.error(err)
        })
      } else {
        createRole(form).then(res => {
          this.handleAfterSubmit(res)
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    handleAfterSubmit(res) {
      if (res.data.res) {
        this.roleFormModalVisible = false
        this.$message.success((this.isEdit ? '编辑' : '添加') + '成功')
        this.getData()
      } else {
        this.$message.error((this.isEdit ? '编辑' : '添加') + '失败')
      }
    },
    handleCancelPermissionModal() {
      this.permissionModalVisible = false
      this.editId = null
    },
    handleCancelMenuModal() {
      this.menuModalVisible = false
      this.editId = null
    }
  }
}
</script>
