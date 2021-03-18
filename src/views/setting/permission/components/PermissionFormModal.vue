<template>
  <a-modal
    :title="(isEdit ? '编辑' : '创建') + '权限'"
    :visible="permissionFormModalVisible"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="permissionForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="权限名" prop="name">
        <a-input v-model="form.name" placeholder="请输入权限名"></a-input>
      </a-form-model-item>
      <a-form-model-item label="父级权限" prop="pid">
        <a-cascader
          v-model="pid"
          placeholder="请选择父级权限"
          expand-trigger="hover"
          :change-on-select="true"
          :options="permissionList"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
        />
      </a-form-model-item>
      <a-form-model-item label="路径" prop="url">
        <a-input v-model="form.url" placeholder="请输入路径"></a-input>
      </a-form-model-item>
      <a-form-model-item label="描述" prop="description">
        <a-textarea v-model="form.description" placeholder="请输入相关描述" :rows="4" :maxLength="100"></a-textarea>
        <span style="display: block;line-height: 16px;">{{ form.description.length }}/100</span>
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleSubmit">确认</a-button>
    </template>
  </a-modal>
</template>

<script>

const defaultFormData = {
  name: '',
  url: '',
  pid: null,
  description: '',
}

export default {
  name: 'PermissionFormModal',
  props: {
    permissionFormModalVisible: {
      type: Boolean,
      default: false, 
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    permissionList: {
      type: Array,
      default: function () {
        return []
      }
    },
    editId: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      rules: {
        name: [
          { required: true, message: '权限名不能为空', trigger: 'blur' },
          { max: 20, message: '最多20个字符', trigger: 'blur' }
        ],
        url: [
          { max: 100, message: '最多100个字符', trigger: 'blur' }
        ],
        description: [{ max: 100, message: '最多100个字符', trigger: 'blur' }],
      },
      form: Object.assign({}, defaultFormData),
      pid: undefined,
    }
  },
  watch: {
    permissionFormModalVisible(val) {
      if (val) {
        this.initForm()
        this.setPermissionListStatus(this.permissionList, true)
      } else {
        this.handleReset()
        this.form = Object.assign({}, defaultFormData)
        this.setPermissionListStatus(this.permissionList, false)
      }
    },
  },
  methods: {
    initForm() {
      if (this.isEdit) {
        this.$set(this.form, 'id', this.formData.id)
        this.$set(this.form, 'name', this.formData.name)
        this.$set(this.form, 'url', this.formData.url)
        this.$set(this.form, 'description', this.formData.description)
        this.setPid(this.permissionList, this.formData.pid)
      }
    },
    setPid(permission, id) {
      if (id == 0) return true

      if (this.pid == undefined) this.pid = []

      for (let i in permission) {
        if (permission[i].id == id) {
          this.pid.push(permission[i].id)

          return true
        }

        if (
          permission[i]['children'] &&
          this.setPid(permission[i]['children'], id)
        ) {
          this.pid.unshift(permission[i].id)
          break
        }
      }

      return false
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleSubmit() {
      this.$refs.permissionForm.validate(valid => {
        if (valid) {
          this.form.pid = this.pid.length > 0 ? this.pid[this.pid.length - 1] : 0
          this.$emit('submit', this.form)
        } else {
          this.$message.error('表单校验不通过，请检查')

          return false
        }
      })
    },
    handleReset() {
      this.pid = undefined
      this.$refs.permissionForm.resetFields()
    },
    setPermissionListStatus(permission, status) {
      if (!this.isEdit) return false

      for (let i in permission) {
        if (permission[i].id == this.editId) {
          permission[i].disabled = status
          
          return true
        }

        if (
          permission[i]['children'] &&
          this.setPermissionListStatus(permission[i]['children'], status)
        ) break
      }

      return false
    },
  }
}
</script>
