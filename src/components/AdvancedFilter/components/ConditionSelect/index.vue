<template>
  <div class="app-container">
    <div>
      <el-timeline>
        <el-timeline-item v-for="(group,index) in groups" :key="index" timestamp="或" color="#0bbd87" placement="top">
          <el-card>
            <div slot="header" class="clearfix">
              <el-button style="float: right;" type="text" icon="el-icon-close" @click="removeGroup(group)" />
            </div>
            <el-form ref="form">
              <el-table
                :data="group"
                border
                stripe
                style="width: 100%"
              >
                <el-table-column
                  label="字段"
                  align="center"
                  style="width: 30%"
                >
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.field"
                      style="width: 100%"
                      placeholder="请选择"
                      @change="fieldChange(index,scope.row)"
                    >
                      <el-option
                        v-for="item in fieldOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="条件"
                  align="center"
                  style="width: 30%"
                >
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.condition" style="width: 100%" placeholder="请选择">
                      <el-option
                        v-for="item in filterConditonOptions(scope.row.type)"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="值"
                  align="center"
                  style="width: 30%"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.type === 'string'">
                      <el-input v-model="scope.row.value" />
                    </div>
                    <div v-else-if="scope.row.type === 'datetime'">
                      <el-date-picker
                        v-model="scope.row.value"
                        type="datetime"
                        value-format="timestamp"
                        style="width: 100%;"
                      />
                    </div>
                    <div v-else-if="scope.row.type === 'date'">
                      <el-date-picker
                        v-model="scope.row.value"
                        type="date"
                        value-format="timestamp"
                        style="width: 100%;"
                      />
                    </div>
                    <div v-else-if="scope.row.type === 'daterange'">
                      <el-date-picker
                        v-model="scope.row.value"
                        type="daterange"
                        value-format="timestamp"
                        range-separator="至"
                        style="width: 100%;"
                      />
                    </div>
                    <div v-else-if="scope.row.type === 'datetimerange'">
                      <el-date-picker
                        v-model="scope.row.value"
                        type="datetimerange"
                        value-format="timestamp"
                        range-separator="至"
                        style="width: 100%;"
                      />
                    </div>
                    <div v-else-if="scope.row.type === 'number'">
                      <el-input-number
                        v-model="scope.row.value"
                        style="width: 100%;"
                      />
                    </div>
                    <div v-else>
                      <el-input v-model="scope.row.value" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                  width="150"
                >
                  <template slot="header">
                    <el-button type="primary" @click="addAndColumn(index)">增加一行(且)</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      plain
                      size="mini"
                      icon="el-icon-delete"
                      @click.prevent="removeAndColumn(index,scope.row)"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="" color="#0bbd87" placement="top">
          <el-button type="primary" @click="addGroup">增加一组(或)</el-button>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div style="text-align: right">
      <el-button @click.stop="cancel">
        取消
      </el-button>
      <el-button type="primary" @click.stop="select">
        确认
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConditionSelect',
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
      conditionOptions: [{
        value: '=',
        label: '等于',
        fieldTypes: ['string', 'date', 'datetime', 'number']
      }, {
        value: 'like',
        label: '模糊',
        fieldTypes: ['string']
      }, {
        value: '>',
        label: '大于',
        fieldTypes: ['date', 'datetime', 'number']
      }, {
        value: '>=',
        label: '大于等于',
        fieldTypes: ['date', 'datetime', 'number']
      }, {
        value: '<',
        label: '小于',
        fieldTypes: ['date', 'datetime', 'number']
      }, {
        value: '<=',
        label: '小于等于',
        fieldTypes: ['date', 'datetime', 'number']
      }, {
        value: 'between',
        label: '介于',
        fieldTypes: ['daterange', 'datetimerange']
      }],
      groups: [[{
        field: '',
        condition: '',
        value: '',
        key: Date.now()
      }]]
    }
  },
  watch: {
    groups: {
      handler: function(val) {
        val.forEach((group) => {
          group.forEach((groupItem) => {
            const filterFields = this.fieldOptions.filter((fieldOption) => fieldOption.value === groupItem.field)
            filterFields.length > 0 ? groupItem.type = filterFields[0].type : 'string'
            const filterConditions = this.conditionOptions.filter((conditionOption) => conditionOption.value === groupItem.condition)
            filterConditions.length > 0 ? groupItem.conditionLabel = filterConditions[0].label : ''
          })
        })
      },
      deep: true
    }
  },
  methods: {
    filterConditonOptions(fieldType) {
      return this.conditionOptions.filter(conditionOption => conditionOption.fieldTypes.includes(fieldType))
    },
    addAndColumn(index) {
      this.groups[index].push({
        field: '',
        condition: '',
        value: '',
        key: Date.now()
      })
    },
    removeAndColumn(index, row) {
      const rowIndex = this.groups[index].indexOf(row)
      if (rowIndex !== -1) {
        this.groups[index].splice(rowIndex, 1)
      }
    },
    fieldChange(index, row) {
      const rowIndex = this.groups[index].indexOf(row)
      if (rowIndex !== -1) {
        this.groups[index][rowIndex]['value'] = ''
        this.groups[index][rowIndex]['condition'] = ''
      }
    },
    addGroup() {
      this.groups.push([{
        field: '',
        condition: '',
        value: '',
        key: Date.now()
      }])
    },
    removeGroup(group) {
      const groupIndex = this.groups.indexOf(group)
      if (groupIndex !== -1) {
        this.groups.splice(groupIndex, 1)
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    select() {
      this.$emit('input', this.groups)
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss">
  .app-container {
    .el-card__header{
      padding:0 20px 0 0;
    }
  }
</style>
