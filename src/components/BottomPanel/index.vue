<template>
  <div :class="{show:value}" class="bottomPanel-container">
    <div class="bottomPanel-background" @click.stop="closeSidebar" />
    <div class="bottomPanel">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i :class="titleIcon" /> {{ title }}</span>
          <div class="bottomPanel-items">
            <slot />
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
    value: {
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
    }
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    theme: {
      get() {
        return this.$store.state.settings.theme
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'theme',
          value: val
        })
      }
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
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bottomPanel-items{
    height: 52vh;
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
  transform: translate(0,100%);
  background: #fff;
  z-index: 1998;
}

.show {
  transition: all .3s cubic-bezier(.3, .7, .1, 1);
  .bottomPanel-background {
    z-index: 1997;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .bottomPanel {
    transform: translate(0,0);
  }
}
</style>
