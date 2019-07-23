<template>
  <div class="groups-container" @click="handleClick">
    <div v-if="groups.length === 0" style="color: #ccc;">
      请选择常用或者点击右侧+选择条件
    </div>
    <div v-for="(group,groupIndex) in groups" :key="groupIndex" class="capsule-group">
      <div class="capsule-avatar">或</div>
      <div v-for="(item,itemIndex) in group" :key="itemIndex">
        <div class="capsule">
          <div v-if="item.type === 'date'">
            <div>{{ item.label + ' ' + item.conditionLabel }} {{ item.value | parseTime('{y}-{m}-{d}') }}</div>
          </div>
          <div v-else-if="item.type === 'datetime'">
            <div>{{ item.label + ' ' + item.conditionLabel }} {{ item.value | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
          </div>
          <div v-else-if="item.type === 'daterange'">
            <div>{{ item.label + ' ' + item.conditionLabel }} {{ parseDateRange(item.value,'{y}-{m}-{d}') }}</div>
          </div>
          <div v-else-if="item.type === 'datetimerange'">
            <div>{{ item.label + ' ' + item.conditionLabel }} {{ parseDateRange(item.value,'{y}-{m}-{d} {h}:{i}:{s}') }}</div>
          </div>
          <div v-else>
            <div>{{ item.label + ' ' + item.conditionLabel }} {{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: 'CapsuleGroup',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    groups: {
      get() {
        const tmpGroups = []

        this.value.forEach(group => {
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
        return tmpGroups
      }
    }
  },
  methods: {
    parseDateRange(value, cformat) {
      const retVal = []
      value.forEach((item) => {
        retVal.push(parseTime(item, cformat))
      })
      return retVal
    },
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .groups-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    word-break:normal;
    cursor: pointer;
  }

  .capsule-group {
    display: flex;
    background-color: #d0d4dd;
    border-radius: 15px;
    line-height: 30px;
    height: 30px;
    margin: 5px 5px 5px 0;
    padding: 0 5px;
    .capsule-avatar {
      background-color: #e7e9ec;
      height: 30px;
      width: 30px;
      text-align: center;
      border-radius: 15px;
      margin: 0 10px 0 -4px;
    }
  }

  .capsule {
    background-color: #e7e9ec;
    border-radius: 10px;
    line-height: 20px;
    height: 20px;
    margin: 5px 4px 0 0;
    padding: 0 10px;
    display: flex;
  }
</style>
