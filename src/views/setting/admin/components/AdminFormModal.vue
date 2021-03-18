<template>
  <a-modal
    :title="isEdit ? '编辑管理员' : '创建管理员'"
    :visible="adminFormModalVisible"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="adminForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="头像" prop="avatar">
        <img :src="fileUrl + form.avatar" alt="头像" class="avatar" v-if="form.avatar" />
        <a-upload
          name="avatar"
          :action="uploadUrl"
          :show-upload-list="false"
          @change="handleUpload"
        >
          <a-button><a-icon type="upload" /> 上传 </a-button>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="用户名" prop="username">
        <a-input v-model="form.username" placeholder="请输入用户名"></a-input>
      </a-form-model-item>
      <a-form-model-item label="手机号" prop="phone">
        <a-input v-model="form.phone" placeholder="请输入手机号"></a-input>
      </a-form-model-item>
      <a-form-model-item label="角色" prop="role">
        <a-select v-model="form.role" mode="multiple" placeholder="请选择角色">
          <a-select-option
            v-for="role in roleList"
            :key="role.id"
            :value="role.id"
          >
            {{ role.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleSubmit">确认</a-button>
    </template>
  </a-modal>
</template>

<script>
import { getList } from '@/api/setting/role'

const defaultFormData = {
  avatar: '',
  username: '',
  phone: '',
  role: [],
}

export default {
  name: 'AdminFormModal',
  props: {
    adminFormModalVisible: {
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
        avatar: [],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { max: 20, message: '最多20个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { max: 150, message: '最多150个字符', trigger: 'blur' }
        ],
        role: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
      },
      form: Object.assign({}, defaultFormData),
      roleList: [],
    }
  },
  computed: {
    uploadUrl: function () {
      return process.env.VUE_APP_BASE_API + '/admin/upload_avatar'
    },
    fileUrl: function () {
      return process.env.VUE_APP_FILE_API
    }
  },
  watch: {
    adminFormModalVisible: function (val) {
      val ? this.initForm() : this.form = Object.assign({}, defaultFormData)
    },
  },
  created() {
    this.getRoleList()
  },
  methods: {
    initForm() {
      if (this.isEdit) {
        this.$set(this.form, 'id', this.formData.id)
        this.$set(this.form, 'avatar', this.formData.avatar)
        this.$set(this.form, 'username', this.formData.username)
        this.$set(this.form, 'phone', this.formData.phone)
        let defaultRole = []
        this.formData.role.forEach(item => defaultRole.push(item.id))
        this.$set(this.form, 'role', defaultRole)
      }
    },
    handleCancel() {
      this.handleReset()
      this.$emit('cancel')
    },
    handleSubmit() {
      this.$refs.adminForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$message.error('表单校验不通过，请检查')

          return false
        }
      })
    },
    handleReset() {
      this.$refs.adminForm.resetFields()
    },
    handleUpload(info) {
      if (info.file.status === 'done') {
        this.$message.success('上传成功')

        this.$set(this.form, 'avatar', info.file.response.data.path)
      } else if (info.file.status === 'error') {
        this.$message.error('上传失败')
      }
    },
    getRoleList() {
      getList({
        pagination: false
      }).then(res => {
        this.roleList = res.data
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
.avatar {
  margin: 0 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
