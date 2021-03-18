<template>
  <a-card style="width: 100%">
    <filter-bar :query="query" :propName="propName" @handleSearch="getData" />
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
      <template slot="role" slot-scope="text, record">
        <a-tag
          v-for="item in record.role"
          :key="item.id"
        >{{ item.name }}</a-tag>
      </template>
      <template slot="status" slot-scope="text, record">
        <a-switch :checked="record.status == 1 ? true : false" @click="handleChangeStatus(record)" :disabled="record.id === 1" />
      </template>
      <template slot="createdAt" slot-scope="text, record">
        {{ record.created_at | filterTime }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button type="link" class="operation-btn" @click="handleEdit(record)">编辑</a-button>
        <a-button type="link" class="operation-btn" @click="handleAssignPermission(record)">权限</a-button>
        <a-button type="link" class="operation-btn" @click="handleAssignMenu(record)">菜单</a-button>
        <a-button type="link" class="operation-btn" @click="handleDelete(record)">删除</a-button>
      </template>
    </a-table>
    <admin-form-modal
      :adminFormModalVisible="adminFormModalVisible"
      :isEdit="isEdit"
      :formData="formData"
      @cancel="handleCancelForm"
      @submit="handleSubmitForm"
    />
    <permission-modal
      :permissionModalVisible="permissionModalVisible"
      :id="editId"
      module="admin"
      @cancel="handleCancelPermissionModal"
    />
    <menu-modal
      :menuModalVisible="menuModalVisible"
      :id="editId"
      module="admin"
      @cancel="handleCancelMenuModal"
    />
  </a-card>
</template>

<script>
import AdminFormModal from './components/AdminFormModal'
import FilterBar from '@/components/FilterBar/Index'
import MenuModal from '../components/MenuModal'
import PermissionModal from '../components/PermissionModal'
import TablePanel from '@/components/TablePanel/Index'
import { getList, createAdmin, editAdmin, deleteAdmin, changeStatus } from '@/api/setting/admin'
import { formatTimestamp } from '@/utils/time'
import { pagination } from '@/mixins/pagination'

export default {
  name: 'AdminList',
  mixins: [pagination],
  components: {
    AdminFormModal,
    FilterBar,
    MenuModal,
    PermissionModal,
    TablePanel,
  },
  data() {
    return {
      query: {
        cur_page: 1,
        page_size: 20,
      },
      propName: ['username'],
      data: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 80,
        },
        {
          title: '昵称',
          dataIndex: 'username',
        },
        {
          title: '角色',
          dataIndex: 'role',
          scopedSlots: { customRender: 'role' },
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          width: 120,
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          width: 80,
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          scopedSlots: { customRender: 'createdAt' },
          width: 150,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 200,
        },
      ],
      loading: false,
      adminFormModalVisible: false,
      isEdit: false,
      formData: {},
      permissionModalVisible: false,
      menuModalVisible: false,
      editId: null,
    }
  },
  filters: {
    filterTime: function (val) {
      return formatTimestamp(val)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getList(this.query).then(res => {
        this.data = res.data.data
        this.pagination.total = res.data.total
        this.loading = false
      }).catch(err => {
        this.$message.error(err)
        this.loading = false
      })
    },
    handleAdd() {
      this.isEdit = false
      this.adminFormModalVisible = true
      this.formData = Object.assign({})
    },
    handleEdit(record) {
      this.isEdit = true
      this.adminFormModalVisible = true
      this.formData = Object.assign({}, record)
    },
    handleAssignPermission(record) {
      this.permissionModalVisible = true
      this.editId = record.id
    },
    handleAssignMenu(record) {
      this.menuModalVisible = true
      this.editId = record.id
    },
    handleDelete(record) {
      let _this = this
      this.$confirm({
        title: '是否确认删除当前项？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          deleteAdmin({ id: record.id }).then(res => {
            if (res.data.res) {
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
      this.adminFormModalVisible = false
    },
    handleChangeStatus(record) {
      let _this = this
      this.$confirm({
        title: '是否' + (record.status ? '禁用' : '启用') + '该用户？',
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
    handleSubmitForm(form) {
      if (this.isEdit) {
        editAdmin(form).then(res => {
          this.handleAfterSubmit(res)
        }).catch(err => {
          this.$message.error(err)
        })
      } else {
        createAdmin(form).then(res => {
          this.handleAfterSubmit(res)
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    handleAfterSubmit(res) {
      if (res.data.res) {
        this.adminFormModalVisible = false
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
