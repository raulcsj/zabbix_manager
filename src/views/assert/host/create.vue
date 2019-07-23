<template>
  <div>
    <sticky :z-index="100" :sticky-top="stickyTop" :class-name="'sub-navbar draft'">
      <div style="width: 100%;text-align: right">
        <el-button icon="fas fa-save" @click="save">
          保存
        </el-button>
      </div>
    </sticky>
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form label-position="right" :rules="rules" label-width="120px" :model="postForm">
            <el-row>
              <el-col :span="8">
                <el-form-item label="主机名" prop="hostName">
                  <el-input v-model="postForm.hostName" clearable class="full-width" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="ip" prop="ip">
                  <el-select
                    v-model="postForm.ip"
                    multiple
                    filterable
                    allow-create
                    clearable
                    default-first-option
                    placeholder="主机ip可多次添加，输入ip后enter键即可添加成功"
                    class="full-width"
                    :popper-class="popperClass"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数据源" prop="dataSource">
                  <el-input v-model="postForm.dataSource" clearable class="full-width" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="操作系统" prop="operatorSystem">
                  <el-input v-model="postForm.operatorSystem" clearable class="full-width" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="hostId" prop="hostId">
                  <el-input v-model="postForm.hostId" clearable class="full-width" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="厂商" prop="vendor">
                  <el-input v-model="postForm.vendor" clearable class="full-width" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="服务器类型" prop="serverType">
                  <el-input v-model="postForm.serverType" clearable class="full-width" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="级别" prop="level">
                  <el-input v-model="postForm.level" clearable class="full-width" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态" prop="status">
                  <el-input v-model="postForm.status" clearable class="full-width" />
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

export default {
  name: 'CreateHost',
  components: {
    Sticky
  },
  data() {
    return {
      popperAppendToBody: false,
      popperClass: 'hidden-popper',
      stickyTop: 83,
      activeName: 'first',
      postForm: {
        id: undefined,
        hostName: '',
        type: '',
        ip: []
      },
      rules: {}
    }
  },
  methods: {
    save() {
      this.$open({ name: 'HostList' }, 'cr')
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
