<template>
  <div class="app-container">
    <aside>
      TagsView是指上部的标签栏，允许打开多个标签，<span class="stress">相同的url</span>只能打开一个标签(url忽略query string，
      也就是说不同的query string依旧认为是同一个url)，TagsViews<span class="stress">默认缓存</span>页面，如果不想缓存需要在路由元数据上定义noCache为true，这样标签就不会缓存，每次激活标签就重新加载页面,请点击测试页面，在测试页面中输入内容后切换标签查看效果
    </aside>
    <el-card>
      <el-button type="primary" @click="$open({name:'TagsViewExamplePage',params:{id:1}},'ncr')">打开测试页面</el-button>
    </el-card>
    <aside>
      标签上右键刷新或者关闭标签可以清除缓存，接下来说一下编程式导航时如何操作TagsView，以下例子都是当前页面和目标页面都打开的情况下操作，如果目标页面没有打开会自动打开
      以下功能使用$open.push(location, onComplete?, onAbort?, target?) 前三个参数用法和vue的$router.push一致，最后一个参数决定了目标页面的行为:
      <ul>
        <li>cr关闭当前刷新目标页面</li>
        <li>ncr不关闭当前页面刷新目标页面</li>
        <li>cnr关闭当前页面不刷新目标页面</li>
        <li>ncnr不关闭当前页面不刷新目标页面</li>
      </ul>
      默认为cr即关闭当前刷新目标页面
    </aside>
    <el-card>
      <el-row class="el-row">
        <el-col :span="6">
          <el-button type="primary" @click="$open({name:'TagsViewExamplePage',params:{id:1}},'cr')">
            <span class="stress">关闭</span>当前页面并<span class="stress">刷新</span>目标页面
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="$open({name:'TagsViewExamplePage',params:{id:1}},'cnr')">
            <span class="stress">关闭</span>当前页面且<span class="stress">不刷新</span>目标页面
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="$open({name:'TagsViewExamplePage',params:{id:1}},'ncr')">
            <span class="stress">不关闭</span>当前页面并<span class="stress">刷新</span>测目标页面
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="$open({name:'TagsViewExamplePage',params:{id:1}},'ncnr')">
            <span class="stress">不关闭</span>当前页面且<span class="stress">不刷新</span>目标页面
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="el-row">
          <code-view ref="jsonEditor" v-model="code[0]" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import CodeView from '@/components/CodeView'
export default {
  components: { CodeView },
  data: () => ({
    code: [
      '<el-row class="el-row">\n' +
      '  <el-col :span="6">\n' +
      '    <el-button type="primary" @click="$open({name:\'TagsViewExamplePage\',params:{id:1}},\'cr\')">\n' +
      '      <span class="stress">关闭</span>当前页面并<span class="stress">刷新</span>目标页面\n' +
      '    </el-button>\n' +
      '  </el-col>\n' +
      '  <el-col :span="6">\n' +
      '    <el-button type="primary" @click="$open({name:\'TagsViewExamplePage\',params:{id:1}},\'cnr\')">\n' +
      '      <span class="stress">关闭</span>当前页面且<span class="stress">不刷新</span>目标页面\n' +
      '    </el-button>\n' +
      '  </el-col>\n' +
      '  <el-col :span="6">\n' +
      '    <el-button type="primary" @click="$open({name:\'TagsViewExamplePage\',params:{id:1}},\'ncr\')">\n' +
      '      <span class="stress">不关闭</span>当前页面并<span class="stress">刷新</span>测目标页面\n' +
      '    </el-button>\n' +
      '  </el-col>\n' +
      '  <el-col :span="6">\n' +
      '    <el-button type="primary" @click="$open({name:\'TagsViewExamplePage\',params:{id:1}},\'ncnr\')">\n' +
      '      <span class="stress">不关闭</span>当前页面且<span class="stress">不刷新</span>目标页面\n' +
      '    </el-button>\n' +
      '  </el-col>\n' +
      '</el-row>'
    ]
  })
}
</script>

<style lang="scss" scoped>
  .stress{
    color: red;
    font-weight:bolder;
    font-size: 130%;
  }
</style>

