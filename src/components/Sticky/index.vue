<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div
      class=""
      :class="classObj"
      :style="{top:(isSticky ? stickyTop +'px' : ''),zIndex:zIndex,height:height+'px'}"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: false,
      position: '',
      width: undefined,
      height: undefined,
      isSticky: false
    }
  },
  computed: {
    ...mapState({
      sidebar_opened: state => state.app.sidebar.opened
    }),
    classObj() {
      return {
        [this.className]: true,
        toppedSticky: !this.isSticky,
        fixedSticky: this.isSticky,
        hideSidebar: !this.sidebar_opened,
        openSidebar: this.sidebar_opened
      }
    }
  },
  watch: {
    // sidebar_opened(opened) {
    //   this.toggleSidebar(opened)
    // }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    sticky() {
      if (this.active) {
        return
      }
      this.active = true
      this.isSticky = true
    },
    handleReset() {
      if (!this.active) {
        return
      }
      this.reset()
    },
    reset() {
      this.active = false
      this.isSticky = false
    },
    handleScroll() {
      const offsetTop = this.$el.getBoundingClientRect().top
      if (offsetTop < this.stickyTop) {
        this.sticky()
        return
      }
      this.handleReset()
    },
    handleResize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px'
      }
    }
  }
}
</script>
<style type="scss" scoped>
  .hideSidebar {
    width: calc(100% - 54px);
    transition: width 0.28s;
  }

  .openSidebar {
    width: calc(100% - 210px);
    transition: width 0.28s;
  }

  .fixedSticky {
    position: fixed;
    right: 0
  }

  .toppedSticky {
    width: auto;
    position: relative;
  }
</style>
