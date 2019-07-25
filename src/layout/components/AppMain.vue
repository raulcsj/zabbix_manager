<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :exclude="['Redirect']" :path-include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="backToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </section>
</template>

<script>

import BackToTop from '@/components/BackToTop'

export default {
  name: 'AppMain',
  components: { BackToTop },
  data() {
    return {
      // customizable button style, show/hide critical point, return position
      backToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews.map((cachedView) => cachedView.path)
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";
.app-main {
  /*40 = navbar  */
  min-height: calc(100vh - #{$navbarHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 100px;
}

.hasTagsView {
  .app-main {
    /* 134 = navbar + tags-view + topheader = 40 + 34 + 50 */
    min-height: calc(100vh - #{$navbarHeight + $tagsViewHeight + $topHeaderHeight});
  }

  .fixed-header+.app-main {
    padding-top: #{$navbarHeight + $tagsViewHeight + $topHeaderHeight};
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
