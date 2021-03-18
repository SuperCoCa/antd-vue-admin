<template>
  <a-card style="width: 100%">
    <table-panel @onRefresh="getData">
      <template slot="left">
        <a-button type="primary" @click="handleAdd">添加</a-button>
      </template>
    </table-panel>
    <a-table
      class="table"
      size="middle"
      :bordered="true"
      :columns="columns"
      :loading="loading"
      :data-source="data"
      :rowKey="record => record.id"
      :pagination="false"
    >
      <template slot="url" slot-scope="text">{{ text === '' ? '-' : text }}</template>
      <template slot="operation" slot-scope="text, record">
        <a-button type="link" class="operation-btn" @click="handleEdit(record)">编辑</a-button>
        <a-button type="link" class="operation-btn" @click="handleDelete(record)">删除</a-button>
      </template>
    </a-table>
    <permission-form-modal
      :permissionFormModalVisible="permissionFormModalVisible"
      :formData="formData"
      :permissionList="data"
      :isEdit="isEdit"
      :editId="editId"
      @cancel="handleCancelFormModal"
      @submit="handleSubmitForm"
    />
  </a-card>
</template>

<script>
import PermissionFormModal from './components/PermissionFormModal'
import TablePanel from '@/components/TablePanel/Index'
import { getPermissionList, createPermission, editPermission, deletePermission } from '@/api/setting/permission'

export default {
  name: 'PermissionIndex',
  components: {
    PermissionFormModal,
    TablePanel,
  },
  data() {
    return {
      query: {},
      data: [],
      columns: [
        {
          title: '权限名称',
          dataIndex: 'name',
        },
        {
          title: '路径',
          dataIndex: 'url',
          scopedSlots: { customRender: 'url' },
        },
        {
          title: '描述',
          dataIndex: 'description',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 200,
        },
      ],
      loading: false,
      permissionFormModalVisible: false,
      isEdit: false,
      editId: 0,
      formData: {},

      searchName: '',
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getPermissionList(this.query).then(res => {
        this.data = res.data
        this.loading = false
      }).catch(err => {
        this.$message.error(err)
        this.loading = false
      })
    },
    handleAdd() {
      this.isEdit = false
      this.permissionFormModalVisible = true
      this.formData = Object.assign({})
    },
    handleEdit(record) {
      this.isEdit = true
      this.editId = record.id
      this.permissionFormModalVisible = true
      this.formData = Object.assign({}, record)
    },
    handleDelete(record) {
      let _this = this
      this.$confirm({
        title: '是否确认删除当前项？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          deletePermission({ id: record.id }).then(res => {
            if (!res.code) {
              _this.$message.success(res.message)
              _this.getData()
            } else {
              _this.$message.error(res.message)
            }
          }).catch(err => {
            _this.$message.error(err)
          })
        },
        onCancel() {},
      })
    },
    handleCancelFormModal() {
      this.permissionFormModalVisible = false
    },
    handleSubmitForm(form) {
      if (this.isEdit) {
        editPermission(form).then(res => {
          this.handleAfterSubmit(res)
        }).catch(err => {
          this.$message.error(err)
        })
      } else {
        createPermission(form).then(res => {
          this.handleAfterSubmit(res)
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    handleAfterSubmit(res) {
      if (res.data.res) {
        this.permissionFormModalVisible = false
        this.$message.success((this.isEdit ? '编辑' : '添加') + '成功')
        this.getData()
      } else {
        this.$message.error((this.isEdit ? '编辑' : '添加') + '失败')
      }
    }
  }
}
</script>
