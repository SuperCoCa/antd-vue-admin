export const pagination = {
  data() {
    return {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,
        defaultCurrent: 1,
        defaultPageSize: 20,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['2', '10', '20', '50'],
      },
    }
  },
  methods: {
    handleTableChange(pagination) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize

      this.$set(this.query, 'cur_page', pagination.current)
      this.$set(this.query, 'page_size', pagination.pageSize)
      this.getData()
    },
  }
}
