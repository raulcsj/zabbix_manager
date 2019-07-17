export default {
  methods: {
    // target cr 关闭当前页刷新目标页面 cnr 关闭当前页不刷新目标页面 ncr不关闭当前页刷新目标页面 3 ncnr不关闭当前页不刷新目标页面
    $open(location, onComplete, onAbort, target) {
      let refreshComplete
      let refreshAbort
      if (!target) {
        target = 'cr'
      }
      if (typeof onComplete !== 'function' && onComplete) {
        target = onComplete
        onComplete = undefined
      } else if (typeof onAbort !== 'function' && onAbort) {
        target = onAbort
        onAbort = undefined
      }

      if (onComplete) {
        refreshComplete = () => {
          onComplete()
          this.refreshCurrentTag()
        }
      } else if (onAbort) {
        refreshAbort = () => {
          onAbort()
          this.refreshCurrentTag()
        }
      } else {
        refreshComplete = this.refreshCurrentTag
        refreshComplete = this.refreshCurrentTag
      }

      switch (target) {
        case 'cr':
          this.closeCurrentTag(location, refreshComplete, refreshAbort)
          break
        case 'cnr':
          this.closeCurrentTag(location, onComplete, onAbort)
          break
        case 'ncr':
          this.$router.push(location, refreshComplete, refreshAbort)
          break
        case 'ncnr':
          this.$router.push(location, onComplete, onAbort)
          break
        default: // 默认cr
          this.closeCurrentTag(location, refreshComplete, refreshAbort)
      }
    },
    closeCurrentTag(location, onComplete, onAbort) {
      this.$store.dispatch('tagsView/delView', this.$route).then(() => {
        this.$router.replace(location, onComplete, onAbort)
      })
    },
    refreshCurrentTag() {
      this.$nextTick(() => {
        const view = this.$route
        this.$store.dispatch('tagsView/delCachedView', view).then(() => {
          const { fullPath } = view
          this.$nextTick(() => {
            this.$router.replace({
              path: '/redirect' + fullPath
            })
          })
        })
      })
    }
  }
}
