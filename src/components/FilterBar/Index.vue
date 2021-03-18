<template>
  <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="filter-bar">
    <a-row :gutter="24">
      <a-col v-for="(prop, index) in filterProps" :key="index" :span="prop.config.span ? prop.config.span : 6">
        <component
          :is="prop.type"
          :item="prop"
          :query="query"
          @handleChange="changeValue(arguments)"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" :style="{ textAlign: 'right' }">
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset" style="margin-left: 8px">重置</a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import FilterInput from './components/FilterInput'
import FilterSelect from './components/FilterSelect'
import { baseConfig } from '@/config/filterBar/base'

export default {
  name: 'FilterBar',
  components: {
    FilterInput,
    FilterSelect,
  },
  props: {
    query: {
      type: Object,
      default: function () {
        return {}
      }
    },
    propName: {
      type: Array,
      default: function () {
        return []
      }
    },
    extraConfig: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      filterProps: {},
      defaultQuery: {},
    }
  },
  created() {
    this.initFilterProps()
  },
  methods: {
    initFilterProps() {
      // 根据传入的需要筛选的选项去配置文件中获取对应的配置
      for (let i in this.propName) {
        // 1. 从附加配置中查找筛选项配置
        if (Object.hasOwnProperty.call(this.extraConfig, this.propName[i])) {
          this.$set(this.filterProps, this.propName[i], this.extraConfig[this.propName[i]])

          continue
        }

        // 2. 从公共配置中查找筛选项配置
        if (Object.hasOwnProperty.call(baseConfig, this.propName[i])) {
          this.$set(this.filterProps, this.propName[i], baseConfig[this.propName[i]])

          continue
        }
      }
      
      // 把设定的默认值赋值给query
      this.setDefaultValue()
      
      // 保存初始的query
      this.setDefaultQuery()
    },
    setDefaultValue() {
      for (let i in this.filterProps) {
        if (this.filterProps[i].default != undefined) {
          this.$set(this.query, this.filterProps[i].name, this.filterProps[i].default)
        }
      }
    },
    setDefaultQuery() {
      this.defaultQuery = JSON.parse(JSON.stringify(this.query))
    },
    // 子组件改变值时触发该方法对query进行更新操作
    changeValue(params) {
      const name = params[0]
      const value = params[1]

      // 值为空则删除筛选项，否则赋值筛选项
      if (value === '') {
        this.$delete(this.query, name)
      } else {
        this.$set(this.query, name, value)
      }
    },
    handleSearch() {
      this.$emit('handleSearch')
    },
    handleReset() {
      // 清空筛选值
      for (let i in this.query) {
        this.clearFilterValue(i)
      }

      // 还原为默认值
      for (let i in this.defaultQuery) {
        this.setFilterValue(i, this.defaultQuery[i])
      }
    },
    // 清空筛选项的值
    clearFilterValue(key) {
      if (this.filterProps[key]) this.$set(this.filterProps[key], 'value', undefined)
      this.$delete(this.query, key)
    },
    // 设置筛选项的值
    setFilterValue(key, value) {
      if (this.filterProps[key]) this.$set(this.filterProps[key], 'value', value)
      this.$set(this.query, key, value)
    }
  }
}
</script>

<style scoped>
.filter-bar {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}
</style>
