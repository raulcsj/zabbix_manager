<template>
  <div>
    <tree-input :tree-data="treeItems" :tree-props="treeProps" @handleNodeClick="handleNodeClick" />
  </div>
</template>
<script>
import TreeInput from '@/components/TreeInput'

export default {
  components: {
    TreeInput
  },
  data() {
    return {
      treeProps:
          {
            label: 'name',
            children: 'children'
          },
      treeItems: [
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
    handleNodeClick(node) {
      console.log('node', node)
    }
  }
}
</script>
