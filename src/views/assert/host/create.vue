<template>
  <div>
    <sticky :z-index="100" :sticky-top="stickyTop" :class-name="'sub-navbar draft'">
      <el-button icon="fas fa-save">
        保存
      </el-button>
    </sticky>
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form label-position="right" :rules="rules" label-width="120px" :model="temp">
            <el-row>
              <el-col :span="8">
                <el-form-item label="主机名" prop="hostName">
                  <el-input v-model="temp.hostName" multiple allow-create class="full-width" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="ip" prop="ip">
                  <el-select
                    v-model="temp.ips"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="主机ip可多次添加，输入ip后enter键即可添加成功"
                    class="full-width"
                    :popper-class="popperClass"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数据源" prop="type">
                  <el-select v-model="temp.type" clearable class="filter-item full-width" placeholder="">
                    <el-option
                      v-for="item in calendarTypeOptions"
                      :key="item.key"
                      :label="item.display_name"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="服务器类型" prop="type">
                  <el-select v-model="temp.type" clearable class="filter-item full-width" placeholder="">
                    <el-option
                      v-for="item in calendarTypeOptions"
                      :key="item.key"
                      :label="item.display_name"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主机类型" prop="type">
                  <el-select v-model="temp.type" clearable class="filter-item full-width" placeholder="">
                    <el-option
                      v-for="item in calendarTypeOptions"
                      :key="item.key"
                      :label="item.display_name"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态" prop="type">
                  <el-select v-model="temp.type" clearable class="filter-item full-width" placeholder="">
                    <el-option
                      v-for="item in calendarTypeOptions"
                      :key="item.key"
                      :label="item.display_name"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="应用系统" name="second">应用系统</el-tab-pane>
        <el-tab-pane label="数据库" name="third">数据库</el-tab-pane>
        <el-tab-pane label="中间件" name="fourth">中间件</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

export default {
  name: 'CreateHost',
  components: {
    Sticky
  },
  data() {
    return {
      popperAppendToBody: false,
      popperClass: 'hidden-popper',
      stickyTop: 80,
      activeName: 'first',
      temp: {
        id: undefined,
        hostName: '',
        type: '',
        ips: []
      },
      calendarTypeOptions,
      rules: {
      },
      statusOptions: ['published', 'draft', 'deleted']
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
