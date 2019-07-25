<template>
  <div class="navbar">
    <breadcrumb class="breadcrumb-container" />
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  }
}
</script>

<style lang="scss">
  .navbar {
    .el-dropdown-menu {
      position: absolute;
      top: 40px;
    }
  }
</style>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";
  .navbar {
    height: $navbarHeight;
    line-height: $navbarHeight;
    overflow: hidden;
    position: relative;
    background: #fafafa;
    .breadcrumb-container {
      float: left;
      margin-left: 20px;
    }
  }
</style>
