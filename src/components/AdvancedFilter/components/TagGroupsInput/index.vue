<template>
  <div
    :class="[
      'el-input',
      {
        'el-input-group': $slots.prepend || $slots.append,
        'el-input-group--append': $slots.append,
        'el-input-group--prepend': $slots.prepend,
      }
    ]"
  >
    <template>
      <!-- 前置元素 -->
      <div v-if="$slots.prepend" class="el-input-group__prepend">
        <slot name="prepend" />
      </div>
      <div class="input_inner group">
        <slot name="inner" />
      </div>
      <!-- 后置元素 -->
      <div v-if="$slots.append" class="el-input-group__append">
        <slot name="append" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .input_inner{
    background-color:#FFF;
    border:1px solid #DCDFE6;
    color:#606266;
    line-height:40px;
    padding:0 15px;
    width:100%
  }

  .group{
    min-height: 40px;
  }
</style>

<script>

export default {
  name: 'TagGroupsInput',
  componentName: 'TagGroupsInput'
}
</script>
