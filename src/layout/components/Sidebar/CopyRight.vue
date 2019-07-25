<template>
  <div class="sidebar-copyright-container" :class="{'collapse':collapse}">
    <transition name="sidebarCopyrightFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-copyright-link" to="/" />
      <router-link v-else key="expand" class="sidebar-copyright-link" to="/">
        <h1 class="sidebar-title"> © 上海宏时数据系统有限公司 </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarCopyRight',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarCopyrightFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarCopyrightFade-enter,
.sidebarCopyrightFade-leave-to {
  opacity: 0;
}

.sidebar-copyright-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-copyright-link {
    height: 100%;
    width: 100%;

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #bfcbd9;
      font-weight: 600;
      line-height: 50px;
      font-size: 12px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
