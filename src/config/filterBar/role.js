const roleIndexConfig = {
  'name': {
    label: '角色名：',
    name: 'name',
    value: undefined,
    placeholder: '请填写',
    type: 'filter-input',
    config: {
      span: 6,
    },
  },
  'status': {
    label: '状态：',
    name: 'status',
    value: undefined,
    placeholder: '请选择',
    type: 'filter-select',
    config: {
      span: 4,
      options: [
        {
          title: '启用',
          value: 1,
        },
        {
          title: '禁用',
          value: 0,
        },
      ]
    }
  }
}

export {
  roleIndexConfig
}