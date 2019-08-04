<template>
  <div class="advanced-filter-container" style="width:100%;overflow: hidden">
    <tag-groups-input class="input-with-select">
      <el-select slot="prepend" v-model="select" clearable placeholder="请选择常用" @change="commonChange">
        <el-option label="常用过滤器1" value="1" />
        <el-option label="常用过滤器2" value="2" />
        <el-option label="常用过滤器3" value="3" />
      </el-select>
      <slot slot="inner">
        <capsule-group v-model="selectedCondition" @click="handleCreate" />
      </slot>
      <el-button slot="append" icon="fas fa-eraser" @click="clearSelect" />
      <el-button slot="append" icon="fas fa-plus" @click="handleCreate" />
      <el-button slot="append" icon="fas fa-search" @click="handleSearch" />
    </tag-groups-input>
    <bottom-panel :visible.sync="show" title="条件选择" title-icon="fas fa-list">
      <condition-select v-model="selectedCondition" :field-options="fieldOptions" @cancel="cancelSelect" />
      <div slot="footer">
        <el-button @click.stop="clearSelect">
          清空
        </el-button>
        <el-button type="primary" @click.stop="cancelSelect">
          确定
        </el-button>
        <el-button type="primary" @click.stop="openSaveMessageBox">
          保存
        </el-button>
      </div>
    </bottom-panel>
  </div>
</template>

<style lang="scss">
  .input-with-select {
    .el-select {
      .el-input {
        width: 200px;
      }
    }
    .el-input-group__prepend {
      background-color: #fff;
    }
  }

</style>

<script>
import BottomPanel from '@/components/BottomPanel'
import ConditionSelect from '@/components/AdvancedFilter/components/ConditionSelect'

import TagGroupsInput from '@/components/AdvancedFilter/components/TagGroupsInput'
import CapsuleGroup from '@/components/AdvancedFilter/components/TagGroupsInput/CapsuleGroup'

export default {
  name: 'AdvancedFilter',
  components: {
    BottomPanel,
    ConditionSelect,
    TagGroupsInput,
    CapsuleGroup
  },
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    fieldOptions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      show: false,
      select: '',
      selectedCondition: []
    }
  },
  watch: {
    selectedCondition: {
      handler: function(val) {
        const tmpGroups = []

        val.forEach(group => {
          const tmpGroup = []
          group.forEach(item => {
            if (item.field !== '' && item.condition !== '' && item.value !== '') {
              tmpGroup.push(item)
            }
          })
          if (tmpGroup.length > 0) {
            tmpGroups.push(tmpGroup)
          }
        })

        this.$emit('input', tmpGroups)
      },
      deep: true
    }
  },
  methods: {
    handleCreate() {
      this.show = !this.show
    },
    cancelSelect() {
      this.show = false
    },
    clearSelect() {
      this.selectedCondition = []
    },
    openSaveMessageBox() {
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    commonChange(val) {
      this.clearSelect()
      if (val) {
        this.selectedCondition.push([{
          condition: 'like',
          field: 'hostName',
          key: 1564108557637,
          value: '一'
        }])
      }
    },
    handleSearch() {
      this.$emit('search')
    }
  }

}
</script>
