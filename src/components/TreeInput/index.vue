<template>
  <div class="app-container">
    <el-dropdown trigger="click" placement="bottom-start">
      <el-input ref="input" v-model="selected.name" :placeholder="inputLabel" readonly />
      <el-dropdown-menu slot="dropdown" style="width: 400px">
        <el-dropdown-item class="no-padding">
          <el-tree
            ref="tree"
            :show-checkbox="checkable"
            :data="computedTreeData"
            :props="treeProps"
            node-key="code"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
          />
        </el-dropdown-item>
        <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'TreeInput',
  props: {
    checkable: {
      type: Boolean,
      default: false
    },
    inputLabel: {
      type: String,
      default: '请选择'
    },
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    treeProps: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      selected: {},
      filterText: '',
      computedTreeData: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.initData()
  },
  methods: {
    handleNodeClick(data) {
      if (!this.checkable) {
        this.selected = data
        this.$refs.input.$el.click()
        this.$emit('handleNodeClick', this.selected)
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    initData() {
      this.transformTreeData()
    },
    transformTreeData() {
      // 生成根数组
      this.treeData.forEach(orgItem => {
        if (orgItem.parentId === 0) {
          this.computedTreeData.push(orgItem)
        }
      })
      // 递归生成多维数组
      this.computedTreeData.forEach(rootItem => {
        this.recursionGenerateChildren(rootItem, this.treeData)
      })
    },
    recursionGenerateChildren(fatherItem, arr) {
      arr.forEach(item => {
        if (fatherItem.id === item.parentId) {
          this.recursionGenerateChildren(item, arr)
          if (!fatherItem.children) {
            fatherItem.children = []
          }
          fatherItem.children.push(item)
        }
      })
    }
  }
}
</script>
