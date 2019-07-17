<template>
  <div class="app-container">
    <aside>
      在下方输入框中输入些内容，输完之后切换别的标签再回来看看
    </aside>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="缓存测试">
          <el-input v-model="form.cache" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      cache: ''
    }
  })
}
</script>
