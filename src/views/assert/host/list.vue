<template>
  <div>
    <sticky :z-index="100" :sticky-top="stickyTop" :class-name="'sub-navbar draft'">
      <el-row :gutter="20">
        <el-col :span="20">
          <advanced-filter v-model="advancedFilterConditions" :field-options="fieldOptions" @add="showBottomPanel = true" />
        </el-col>
        <el-col :span="4" style="text-align: right">
          <el-button icon="fas fa-plus" :disabled="listLoading" @click="handleCreate">
            新增
          </el-button>
          <el-button
            v-waves
            :loading="downloadLoading"
            :disabled="listLoading"
            icon="fas fa-download"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-col>
      </el-row>
    </sticky>
    <!--<bottom-panel v-model="showBottomPanel" title="条件选择" title-icon="fas fa-hand-pointer">-->
      <!--<condition-select v-model="advancedFilterConditions" :field-options="fieldOptions" @cancel="showBottomPanel = false" />-->
    <!--</bottom-panel>-->
    <div class="app-container">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        stripe
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="主机名" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.hostName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主机ip">
          <template slot-scope="{row}">
            <span>{{ row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据源" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.dataSource }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作系统">
          <template slot-scope="{row}">
            <span>{{ row.operatorSystem }}</span>
          </template>
        </el-table-column>
        <el-table-column label="hostid" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.hostId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="厂商" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.vendor }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务器类型" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.serverType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="级别" align="center">
          <template slot-scope="{row}">
            <span>{{ row.level }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用系统" align="center">
          <template slot-scope="{row}">
            <span>{{ row.application }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="中间件类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.middleWareType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付时间" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.payTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" icon="el-icon-edit" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleModifyStatus(row,'deleted')" />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
import { fetchList } from '@/api/host'
import waves from '@/directive/waves' // waves directive
import Sticky from '@/components/Sticky' // 粘性header组件
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import AdvancedFilter from '@/components/AdvancedFilter' // secondary package based on el-pagination

import BottomPanel from '@/components/BottomPanel'
import ConditionSelect from '@/components/AdvancedFilter/components/ConditionSelect'

export default {
  name: 'HostListTable',
  components: {
    BottomPanel,
    ConditionSelect, Pagination, AdvancedFilter, Sticky },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      showBottomPanel: false,
      stickyTop: 80,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      downloadLoading: false,
      fieldOptions: [{
        value: 'timestamp',
        label: 'Date',
        type: 'daterange'
      }, {
        value: 'title',
        label: 'Title',
        type: 'string'
      }, {
        value: 'author',
        label: 'Author',
        type: 'string'
      }],
      advancedFilterConditions: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleCreate() {
      this.$open({ name: 'CreateHost' }, 'ncr')
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
