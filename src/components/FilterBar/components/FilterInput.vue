<template>
  <a-form-item :label="item.label">
    <a-input
      v-model="item.value"
      :placeholder="item.placeholder ? item.placeholder : '请填写'"
      :allow-clear="clearable"
      @change="handleChange(item.name, item.value)"
    ></a-input>
  </a-form-item>
</template>

<script>
import { filterBarConfig } from '../mixins/filterBarConfig'

export default {
  name: 'FilterInput',
  mixins: [filterBarConfig],
}
</script>
