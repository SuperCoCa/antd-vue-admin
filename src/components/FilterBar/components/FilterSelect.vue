<template>
  <a-form-item :label="item.label">
    <a-select
      v-model="item.value"
      :mode="mode"
      :placeholder="item.placeholder ? item.placeholder : '请选择'"
      :allow-clear="clearable"
      :show-search="showSearch"
      @change="handleChange(item.name, item.value)"
    >
      <a-select-option
        v-for="(option, index) in item.config.options"
        :key="index"
        :value="option.value"
      >{{ option.title }}</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
import { filterBarConfig } from '../mixins/filterBarConfig'

export default {
  name: 'FilterSelect',
  mixins: [filterBarConfig],
  computed: {
    mode() {
      return this.item.config.mode == undefined ? 'default' : this.item.config.mode
    },
    showSearch() {
      return this.item.config.search == undefined ? false : this.item.config.search
    }
  },
}
</script>