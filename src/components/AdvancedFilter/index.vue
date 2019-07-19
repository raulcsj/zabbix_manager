<template>
  <div>
    <tag-groups-input class="input-with-select">
      <el-select slot="prepend" v-model="select" placeholder="请选择常用">
        <el-option label="餐厅名" value="1" />
        <el-option label="订单号" value="2" />
        <el-option label="用户电话" value="3" />
      </el-select>
      <slot slot="inner">
        <capsule-group v-model="selectedCondition" />
      </slot>
      <el-button slot="append" icon="el-icon-plus" @click="handleCreate" />
      <el-button slot="append" icon="el-icon-search" />
    </tag-groups-input>
    <bottom-panel v-model="show" title="条件选择" title-icon="fas fa-hand-pointer">
      <condition-select v-model="selectedCondition" :field-options="fieldOptions" @cancel="cancelSelect" />
    </bottom-panel>
  </div>
</template>

<style lang="scss" scoped>
  .input-with-select{
    .el-select {
      width: 130px;
    }
    .el-input{
      width: 130px;
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
      default: function() { return [] }
    },
    fieldOptions: {
      type: Array,
      default: function() { return [] }
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
        this.$emit('input', val)
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
    }
  }

}
</script>
