<template>
  <a-modal
    :title="isEdit ? '编辑菜单' : '创建菜单'"
    :visible="menuFormModalVisible"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="menuForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="父级菜单" prop="pid">
        <a-select v-model="form.pid" placeholder="请选择父级菜单">
          <a-select-option
            v-for="(menu, index) in primaryMenu"
            :key="index"
            :value="menu.value"
          >{{ menu.title }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="菜单名" prop="title">
        <a-input v-model="form.title" placeholder="请输入菜单名"></a-input>
      </a-form-model-item>
      <a-form-model-item label="值" prop="name">
        <a-input v-model="form.name" placeholder="请输入值"></a-input>
      </a-form-model-item>
      <a-form-model-item label="排序" prop="sort">
        <a-input-number v-model="form.sort" :min="0" />
      </a-form-model-item>
      <a-form-model-item label="图标" prop="icon">
        <a-input v-model="form.icon" placeholder="请输入图标名"></a-input>
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
  pid: undefined,
  title: '',
  name: '',
  sort: 0,
  icon: '',
}

const defaultPrimaryMenu = [
  {
    title: '无',
    value: 0,
  }
]

export default {
  name: 'MenuFormModal',
  props: {
    menuFormModalVisible: {
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
    menuList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      rules: {
        pid: [{ required: true, message: '父级菜单不能为空', trigger: 'blur' }],
        title: [
          { required: true, message: '菜单名不能为空', trigger: 'blur' },
          { max: 10, message: '最多10个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '值不能为空', trigger: 'blur' },
          { max: 20, message: '最多20个字符', trigger: 'blur' }
        ],
        sort: [{ required: true, message: '排序值不能为空', trigger: 'blur' }],
        icon: [{ max: 50, message: '最多50个字符', trigger: 'blur' }],
      },
      form: Object.assign({}, defaultFormData),
      primaryMenu: [],
    }
  },
  watch: {
    menuFormModalVisible: function (val) {
      val ? this.initForm() : this.form = Object.assign({}, defaultFormData)
    },
    menuList: function (val) {
      this.getPrimaryMenu(val)
    }
  },
  methods: {
    initForm() {
      this.form = Object.assign({}, defaultFormData)

      if (this.isEdit) {
        this.$set(this.form, 'id', this.formData.id)
        this.$set(this.form, 'pid', this.formData.pid)
        this.$set(this.form, 'title', this.formData.title)
        this.$set(this.form, 'name', this.formData.name)
        this.$set(this.form, 'sort', this.formData.sort)
        this.$set(this.form, 'icon', this.formData.icon)
      }
    },
    getPrimaryMenu(menus) {
      this.primaryMenu = JSON.parse(JSON.stringify(defaultPrimaryMenu))

      menus.forEach(menu => {
        this.primaryMenu.push({
          value: menu.id,
          title: menu.title
        })
      })
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleSubmit() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$message.error('表单校验不通过，请检查')

          return false
        }
      })
    },
    handleReset() {
      this.$refs.menuForm.resetFields()
    }
  }
}
</script>
