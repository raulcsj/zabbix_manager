<template>
  <div class="app-container">
    <aside>
      底部弹出面板
    </aside>
    <el-card>
      <el-button type="primary" @click="visible = true">打开底部面板</el-button>
      <aside>
        需要设置visible属性，它接收Boolean，当为true时显示 BottomPanel。BottomPanel 分为两个部分：body和footer，footer需要具名为footer的slot。title属性用于定义标题，它是可选的，默认值为空。
      </aside>
      <el-row>
        <el-col :span="24" class="el-row">
          <code-view ref="jsonEditor" v-model="code[0]" />
        </el-col>
      </el-row>
    </el-card>
    <h3>属性</h3>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="params"
        label="参数"
        width="200"
      />
      <el-table-column
        prop="type"
        label="类型"
        width="100"
      />
      <el-table-column
        prop="defaultValue"
        label="默认值"
        width="100"
      />
      <el-table-column
        prop="mark"
        label="说明"
      />
    </el-table>
    <bottom-panel :visible.sync="visible" title="example" title-icon="fas fa-pager" :height="height">
      <span class="bottom-panel-content">
        内容区域
      </span>
      <span slot="footer" class="bottom-panel-footer">
        <el-button @click="visible = false">取 消</el-button>
      </span>
    </bottom-panel>
  </div>
</template>

<script>

import BottomPanel from '@/components/BottomPanel'
import CodeView from '@/components/CodeView'
export default {
  name: 'BottomPanelExample',
  components: {
    BottomPanel,
    CodeView
  },
  data() {
    return {
      visible: false,
      height: 100,
      code: ['<bottom-panel :visible.sync="visible" title="example" title-icon="fas fa-pager" :height="height">\n' +
      '      <span class="bottom-panel-content">\n' +
      '        内容区域\n' +
      '      </span>\n' +
      '      <span slot="footer" class="bottom-panel-footer">\n' +
      '        <el-button @click="visible = false">取 消</el-button>\n' +
      '      </span>\n' +
      '</bottom-panel>'],
      tableData: [{
        params: 'visible',
        mark: '是否显示bottompanel，支持.sync修饰符',
        type: 'boolean',
        defaultValue: 'false'
      }, {
        params: 'title',
        mark: '标题',
        type: 'string',
        defaultValue: '-'
      }, {
        params: 'title-icon',
        mark: '标题前置icon',
        type: 'string',
        defaultValue: '-'
      }, {
        params: 'height',
        mark: '高度,单位 px',
        type: 'number',
        defaultValue: '400'
      }]
    }
  }
}
</script>
