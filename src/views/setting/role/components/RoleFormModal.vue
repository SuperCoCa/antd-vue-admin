<template>
  <a-modal
    :title="(isEdit ? '编辑' : '创建') + '角色'"
    :visible="roleFormModalVisible"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="roleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="角色名" prop="name">
        <a-input v-model="form.name" placeholder="请输入角色名"></a-input>
      </a-form-model-item>
      <a-form-model-item label="描述" prop="description">
        <a-textarea v-model="form.description" placeholder="请输入相关描述" :rows="4" :maxLength="150"></a-textarea>
        <span style="display: block;line-height: 16px;">{{ form.description.length }}/150</span>
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
  description: '',
}

export default {
  name: 'RoleFormModal',
  props: {
    roleFormModalVisible: {
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
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      rules: {
        name: [
          { required: true, message: '角色名不能为空', trigger: 'blur' },
          { max: 20, message: '最多20个字符', trigger: 'blur' }
        ],
        description: [{ max: 150, message: '最多150个字符', trigger: 'blur' }],
      },
      form: Object.assign({}, defaultFormData),
    }
  },
  watch: {
    roleFormModalVisible: function (val) {
      val ? this.initForm() : this.form = Object.assign({}, defaultFormData)
    },
  },
  methods: {
    initForm() {
      if (this.isEdit) {
        this.$set(this.form, 'id', this.formData.id)
        this.$set(this.form, 'name', this.formData.name)
        this.$set(this.form, 'description', this.formData.description)
      }
    },
    handleCancel() {
      this.handleReset()
      this.$emit('cancel')
    },
    handleSubmit() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$message.error('表单校验不通过，请检查')

          return false
        }
      })
    },
    handleReset() {
      this.$refs.roleForm.resetFields()
    }
  }
}
</script>
