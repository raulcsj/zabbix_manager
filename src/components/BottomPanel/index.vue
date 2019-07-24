<template>
  <div :class="{show:visible}" class="bottomPanel-container" :style="{visibility: visible?'visible':'hidden'}">
    <div class="bottomPanel-background" @click.stop="closeSidebar" />
    <div class="bottomPanel">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i :class="titleIcon" /> {{ title }}</span>
          <div class="bottomPanel-items" :style="{height:height + 'px'}">
            <slot />
          </div>
          <div class="bottomPanel-footer">
            <slot name="footer" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomPanel',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    titleIcon: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 400
    }
  },
  beforeDestroy() {
    const elx = this.$refs.bottomPanel
    if (elx) {
      elx.remove()
    }
  },
  methods: {
    closeSidebar(evt) {
      const parent = evt.target.closest('.bottomPanel')
      if (!parent) {
        this.$emit('update:visible', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bottomPanel-items {
    overflow: scroll;
  }

  .bottomPanel-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity .3s cubic-bezier(.3, .7, .1, 1);
    background: rgba(0, 0, 0, .2);
    z-index: -1;
  }

  .bottomPanel {
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    transition: all .25s cubic-bezier(.3, .7, .1, 1);
    transform: translate(0, 100%);
    background: #fff;
  }

  .show {
    .bottomPanel-background {
      z-index: 1997;
      opacity: 1;
      width: 100%;
      height: 100%;
    }

    .bottomPanel {
      transform: translate(0, 0);
      z-index: 1998;
    }
  }

  .bottomPanel-footer{
    text-align: right;
  }
</style>
