<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-dropdown trigger="click" placement="bottom-start" style="width: 100%">
          <el-input v-show="!checkable" ref="input" v-model="inputText" :placeholder="inputLabel" readonly />
          <el-select
            v-show="checkable"
            ref="select"
            v-model="selectedNames"
            clearable
            multiple
            :placeholder="inputLabel"
            :popper-class="popperClass"
            style="width: 100%"
            @click.native="$refs.input.$el.click()"
            @clear="clearSelected"
            @remove-tag="removeTag"
          ><i slot="suffix" class="el-input__icon el-icon-date" /></el-select>
          <el-dropdown-menu slot="dropdown" style="padding-left: 10px; padding-right: 10px" :style="{width: treeWidth}">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
            <el-dropdown-item class="no-padding">
              <el-tree
                ref="tree"
                :show-checkbox="checkable"
                :data="computedTreeData"
                :props="treeProps"
                node-key="value"
                :check-strictly="checkStrictly"
                default-expand-all
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                @check="handleCheck"
              />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
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
    },
    treeWidth: {
      type: String,
      default() {
        return '400px'
      }
    }
  },
  data() {
    return {
      inputText: '',
      selected: [],
      selectedNames: [], // 多选时存储已选中的节点名称
      filterText: '',
      computedTreeData: [], // 重新组装后的treeData数组
      checkStrictly: true, // 多选模式中，勾选node时，不关联勾选子node
      popperClass: 'hidden-popper'
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
    // 点击tree里的node
    handleNodeClick(data) {
      if (!this.checkable) {
        this.selected[0] = data
        this.inputText = data.name
        this.$refs.input.$el.click()
        this.$emit('handleNodeClick', this.selected)
      }
    },
    // 选中tree里的多选框
    handleCheck(data, selectedData) {
      this.selected = selectedData.checkedNodes
      this.selectedNames = []
      this.selected.forEach(item => {
        this.selectedNames.push(this.recursionSpellFullName(item, item.name))
      })
      this.$emit('handleNodeClick', this.selected)
    },
    // 清空所有已选
    clearSelected() {
      this.selectedNames = []
      this.selected = []
      this.$refs.tree.setCheckedNodes([])
      this.$emit('handleNodeClick', this.selected)
    },
    // 点击tag的删除按钮时
    removeTag(tag) {
      const names = tag.split('/')
      this.recursionSplitFullName(this.computedTreeData, names, 0)
    },
    // 过滤框
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 初始化数据
    initData() {
      this.selected = []
      this.transformTreeData()
    },
    // 重新装配传入数组（一般接收到的后端数组为扁平化数组，需要转型为多维数组）
    transformTreeData() {
      // 生成根数组
      this.treeData.forEach(orgItem => {
        if (orgItem.parentId === 0) {
          this.computedTreeData.push(orgItem)
        }
      })
      this.computedTreeData.forEach(rootItem => {
        this.recursionGenerateChildren(rootItem, this.treeData)
      })
    },
    // 递归生成多维数组
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
    },
    // 递归拼装全名
    recursionSpellFullName(item, name) {
      if (item.parentId !== 0) {
        const currentParentItem = this.treeData.find(data => data.id === item.parentId)
        name = currentParentItem.name + '/' + name
        return this.recursionSpellFullName(currentParentItem, name)
      } else {
        return name
      }
    },
    // 递归拆分全名并更新已选数组
    recursionSplitFullName(array, names, index) {
      array.forEach(data => {
        if (data.name === names[index]) {
          if (names.length > index + 1) {
            return this.recursionSplitFullName(data.children, names, index + 1)
          } else {
            this.selected.splice(this.selected.indexOf(data), 1)
            this.$refs.tree.setCheckedNodes(this.selected)
            this.$emit('handleNodeClick', this.selected)
          }
        }
      })
    }
  }
}
</script>
