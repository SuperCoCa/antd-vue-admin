export const filterBarConfig = {
  props: {
    item: {
      type: Object
    },
    query: {
      type: Object,
    }
  },
  computed: {
    // 判断是否可清除选项
    clearable() {
      return this.item.config.clearable == undefined ? true : this.item.config.clearable
    }
  },
  created() {
    // 如果有配置默认值则写入到value中
    if (this.item.default) this.$set(this.item, 'value', this.item.default)
  },
  methods: {
    // 触发筛选值改变事件
    handleChange(name, value) {
      this.$emit('handleChange', name, value)
    }
  }
}