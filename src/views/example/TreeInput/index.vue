<template>
  <div class="app-container">
    <aside>
      树形输入框
    </aside>
    <el-card>
      <div style="width: 100%">
        <el-row>
          <el-col :span="4">
            <div style="text-align: center;min-height: 36px;line-height: 36px">单选</div>
          </el-col>
          <el-col :span="20">
            <tree-input :tree-data="treeItems1" :tree-props="treeProps" @handleNodeClick="handleNodeClick" />
          </el-col>
        </el-row>
      </div>
      <aside>
        tree-data为必传属性，接收需要展示的数组。tree-props为配置选项，具体看下表。handleNodeClick绑定选择数据时的回传方法。
      </aside>
      <el-row>
        <el-col :span="24" class="el-row">
          <code-view ref="jsonEditor" v-model="code[0]" />
        </el-col>
      </el-row>
      <div style="width: 100%">
        <el-row>
          <el-col :span="4">
            <div style="text-align: center;min-height: 36px;line-height: 36px">多选</div>
          </el-col>
          <el-col :span="20">
            <tree-input :tree-data="treeItems2" :tree-props="treeProps" :checkable="checkable" @handleNodeClick="handleNodeClick" />
          </el-col>
        </el-row>
      </div>
      <aside>
        checkable用于设置tree是否可多选，默认为false。
      </aside>
      <el-row>
        <el-col :span="24" class="el-row">
          <code-view ref="jsonEditor" v-model="code[1]" />
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
    <h3>Props</h3>
    <el-table
      :data="propsData"
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
    <h3>事件</h3>
    <el-table
      :data="eventsData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="事件名称"
        width="200"
      />
      <el-table-column
        prop="mark"
        label="说明"
        width="200"
      />
      <el-table-column
        prop="params"
        label="回调参数"
      />
    </el-table>
  </div>
</template>

<script>

import TreeInput from '@/components/TreeInput'
import CodeView from '@/components/CodeView'
export default {
  components: {
    TreeInput,
    CodeView
  },
  data() {
    return {
      code: ['<tree-input \n' +
      '    :tree-data="treeItems" \n' +
      '    :tree-props="treeProps" \n' +
      '    @handleNodeClick="handleNodeClick" /> \n' +
      '<script>\n' +
      'import TreeInput from \'@/components/TreeInput\'\n' +
      'export default {\n' +
      '  components: {\n' +
      '    TreeInput,\n' +
      '  },\n' +
      '  data() {\n' +
      '    return {\n' +
      '      treeProps:\n' +
      '        {\n' +
      '          label: \'name\',\n' +
      '          children: \'children\'\n' +
      '        },\n' +
      '      treeItems: [\n' +
      '        {\n' +
      '          id: 1,\n' +
      '          name: \'China\',\n' +
      '          value: \'1\',\n' +
      '          parentId: 0\n' +
      '        },\n' +
      '        {\n' +
      '          id: 2,\n' +
      '          name: \'USA\',\n' +
      '          value: \'2\',\n' +
      '          parentId: 0\n' +
      '        },\n' +
      '        {\n' +
      '          id: 3,\n' +
      '          name: \'JiangSu\',\n' +
      '          value: \'1-1\',\n' +
      '          parentId: 1\n' +
      '        },\n' +
      '        {\n' +
      '          id: 4,\n' +
      '          name: \'NanJing\',\n' +
      '          value: \'1-1-1\',\n' +
      '          parentId: 3\n' +
      '        },\n' +
      '        {\n' +
      '          id: 5,\n' +
      '          name: \'SuZhou\',\n' +
      '          value: \'1-1-2\',\n' +
      '          parentId: 3\n' +
      '        },\n' +
      '        {\n' +
      '          id: 6,\n' +
      '          name: \'ZheJiang\',\n' +
      '          value: \'1-2\',\n' +
      '          parentId: 1\n' +
      '        },\n' +
      '        {\n' +
      '          id: 7,\n' +
      '          name: \'HangZhou\',\n' +
      '          value: \'1-2-1\',\n' +
      '          parentId: 6\n' +
      '        },\n' +
      '        {\n' +
      '          id: 8,\n' +
      '          name: \'NingBo\',\n' +
      '          value: \'1-2-2\',\n' +
      '          parentId: 6\n' +
      '        }\n' +
      '      ]\n' +
      '    }\n' +
      '  },\n' +
      '  methods: {\n' +
      '    handleNodeClick(nodes) {\n' +
      '      console.log(\'nodes\', nodes)\n' +
      '    }\n' +
      '  }\n' +
      '}\n' +
      '<\/script>',
      '<tree-input \n' +
      '    :tree-data="treeItems" \n' +
      '    :tree-props="treeProps" \n' +
      '    :checkable="checkable" \n' +
      '    @handleNodeClick="handleNodeClick" /> \n' +
      '<script>\n' +
      'import TreeInput from \'@/components/TreeInput\'\n' +
      'export default {\n' +
      '  components: {\n' +
      '    TreeInput,\n' +
      '  },\n' +
      '  data() {\n' +
      '    return {\n' +
      '      checkable: true,\n' +
      '      treeProps:\n' +
      '        {\n' +
      '          label: \'name\',\n' +
      '          children: \'children\'\n' +
      '        },\n' +
      '      treeItems: [\n' +
      '        {\n' +
      '          id: 1,\n' +
      '          name: \'China\',\n' +
      '          value: \'1\',\n' +
      '          parentId: 0\n' +
      '        },\n' +
      '        {\n' +
      '          id: 2,\n' +
      '          name: \'USA\',\n' +
      '          value: \'2\',\n' +
      '          parentId: 0\n' +
      '        },\n' +
      '        {\n' +
      '          id: 3,\n' +
      '          name: \'JiangSu\',\n' +
      '          value: \'1-1\',\n' +
      '          parentId: 1\n' +
      '        },\n' +
      '        {\n' +
      '          id: 4,\n' +
      '          name: \'NanJing\',\n' +
      '          value: \'1-1-1\',\n' +
      '          parentId: 3\n' +
      '        },\n' +
      '        {\n' +
      '          id: 5,\n' +
      '          name: \'SuZhou\',\n' +
      '          value: \'1-1-2\',\n' +
      '          parentId: 3\n' +
      '        },\n' +
      '        {\n' +
      '          id: 6,\n' +
      '          name: \'ZheJiang\',\n' +
      '          value: \'1-2\',\n' +
      '          parentId: 1\n' +
      '        },\n' +
      '        {\n' +
      '          id: 7,\n' +
      '          name: \'HangZhou\',\n' +
      '          value: \'1-2-1\',\n' +
      '          parentId: 6\n' +
      '        },\n' +
      '        {\n' +
      '          id: 8,\n' +
      '          name: \'NingBo\',\n' +
      '          value: \'1-2-2\',\n' +
      '          parentId: 6\n' +
      '        }\n' +
      '      ]\n' +
      '    }\n' +
      '  },\n' +
      '  methods: {\n' +
      '    handleNodeClick(nodes) {\n' +
      '      console.log(\'nodes\', nodes)\n' +
      '    }\n' +
      '  }\n' +
      '}\n' +
      '<\/script>'
      ],
      tableData: [{
        params: 'tree-data',
        mark: '必传，接收需要展示的一维数组（由于实际项目中，后台所传数组多为"通过parentId建立关联关系的一维数组",故此处数组格式与原生tree控件不同，tree-input内部会自动进行转换）',
        type: 'array',
        defaultValue: '-'
      }, {
        params: 'tree-props',
        mark: '配置选项，具体看下表',
        type: 'array',
        defaultValue: '-'
      }, {
        params: 'checkable',
        mark: '用于设置tree是否可多选',
        type: 'boolean',
        defaultValue: 'false'
      }, {
        params: 'inputLabel',
        mark: '输入框占位文本',
        type: 'string',
        defaultValue: '请选择'
      }, {
        params: 'treeWidth',
        mark: 'tree控件的宽度',
        type: 'string',
        defaultValue: '400px'
      }],
      propsData: [{
        params: 'label',
        mark: '指定节点标签为节点对象的某个属性值',
        type: 'string',
        defaultValue: '-'
      }, {
        params: 'children',
        mark: '指定子树为节点对象的某个属性值',
        type: 'string',
        defaultValue: '-'
      }, {
        params: 'disabled',
        mark: '指定节点选择框是否禁用为节点对象的某个属性值',
        type: 'boolean',
        defaultValue: '-'
      }, {
        params: 'isLeaf',
        mark: '指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效',
        type: 'boolean',
        defaultValue: '-'
      }],
      eventsData: [{
        name: 'handleNodeClick',
        params: 'nodes：已在tree中选择的node的集合',
        mark: 'array'
      }],
      checkable: true,
      treeProps:
        {
          label: 'name',
          children: 'children'
        },
      treeItems1: [
        {
          id: 1,
          name: 'China',
          value: '1',
          parentId: 0
        },
        {
          id: 2,
          name: 'USA',
          value: '2',
          parentId: 0
        },
        {
          id: 3,
          name: 'JiangSu',
          value: '1-1',
          parentId: 1
        },
        {
          id: 4,
          name: 'NanJing',
          value: '1-1-1',
          parentId: 3
        },
        {
          id: 5,
          name: 'SuZhou',
          value: '1-1-2',
          parentId: 3
        },
        {
          id: 6,
          name: 'ZheJiang',
          value: '1-2',
          parentId: 1
        },
        {
          id: 7,
          name: 'HangZhou',
          value: '1-2-1',
          parentId: 6
        },
        {
          id: 8,
          name: 'NingBo',
          value: '1-2-2',
          parentId: 6
        }
      ],
      treeItems2: [
        {
          id: 1,
          name: 'China',
          value: '1',
          parentId: 0
        },
        {
          id: 2,
          name: 'USA',
          value: '2',
          parentId: 0
        },
        {
          id: 3,
          name: 'JiangSu',
          value: '1-1',
          parentId: 1
        },
        {
          id: 4,
          name: 'NanJing',
          value: '1-1-1',
          parentId: 3
        },
        {
          id: 5,
          name: 'SuZhou',
          value: '1-1-2',
          parentId: 3
        },
        {
          id: 6,
          name: 'ZheJiang',
          value: '1-2',
          parentId: 1
        },
        {
          id: 7,
          name: 'HangZhou',
          value: '1-2-1',
          parentId: 6
        },
        {
          id: 8,
          name: 'NingBo',
          value: '1-2-2',
          parentId: 6
        }
      ]
    }
  },
  methods: {
    handleNodeClick(nodes) {
      console.log('nodes', nodes)
    }
  }
}
</script>
