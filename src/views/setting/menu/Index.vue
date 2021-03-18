<template>
  <a-card style="width: 100%">
    <table-panel @onRefresh="getData">
      <template slot="left">
        <a-button type="primary" @click="handleAdd">添加</a-button>
      </template>
    </table-panel>
    <a-table
      class="table"
      :columns="columns"
      :data-source="data"
      bordered 
      size="middle"
      :rowKey="record => record.id"
      :loading="loading"
      :pagination="false"
    >
      <template slot="name" slot-scope="text">
        <a>{{ text }}</a>
      </template>
      <template slot="icon" slot-scope="text">
        <svg-icon :icon-class="text" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button type="link" class="operation-btn" @click="handleEdit(record)">编辑</a-button>
        <a-button type="link" class="operation-btn" @click="handleDelete(record)">删除</a-button>
      </template>
    </a-table>
    <menu-form-modal
      :menuFormModalVisible="menuFormModalVisible"
      :isEdit="isEdit"
      :formData="formData"
      :menuList="data"
      @cancel="handleCancelForm"
      @submit="handleSubmitForm"
    />
  </a-card>
</template>

<script>
import MenuFormModal from './components/MenuFormModal'
import TablePanel from '@/components/TablePanel/Index'
import { getMenuList, createMenu, editMenu, deleteMenu } from '@/api/setting/menu'

export default {
  name: 'MenuList',
  components: {
    MenuFormModal,
    TablePanel,
  },
  data() {
    return {
      query: {},
      data: [],
      columns: [
        {
          title: '菜单名',
          dataIndex: 'title',
          width: '30%',
        },
        {
          title: '值',
          dataIndex: 'name',
        },
        {
          title: '排序',
          dataIndex: 'sort',
          width: 80,
        },
        {
          title: '图标',
          dataIndex: 'icon',
          scopedSlots: { customRender: 'icon' },
          width: 80,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
      loading: false,
      menuFormModalVisible: false,
      isEdit: false,
      formData: {},
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getMenuList(this.query).then(res => {
        this.data = res.data
        this.loading = false
      }).catch(err => {
        this.$message.error(err)
        this.loading = false
      })
    },
    handleAdd() {
      this.isEdit = false
      this.menuFormModalVisible = true
      this.formData = Object.assign({})
    },
    handleEdit(record) {
      this.isEdit = true
      this.menuFormModalVisible = true
      this.formData = Object.assign({}, record)
    },
    handleDelete(record) {
      let _this = this
      this.$confirm({
        title: '是否确认删除当前项？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          deleteMenu({ id: record.id }).then(res => {
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
      this.menuFormModalVisible = false
    },
    handleSubmitForm(form) {
      if (this.isEdit) {
        editMenu(form).then(res => {
          this.handleAfterSubmit(res)
        }).catch(err => {
          this.$message.error(err)
        })
      } else {
        createMenu(form).then(res => {
          this.handleAfterSubmit(res)
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    handleAfterSubmit(res) {
      if (res.data.res) {
        this.menuFormModalVisible = false
        this.$message.success(this.isEdit ? '编辑' : '添加' + '成功')
        this.getData()
      } else {
        this.$message.error(this.isEdit ? '编辑' : '添加' + '失败')
      }
    }
  }
}
</script>
