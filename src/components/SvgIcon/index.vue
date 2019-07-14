<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <i v-else-if="isFa" :class="iconName" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    // 根据iconClass判断是否是font-awesome图标
    isFa() {
      if (this.iconClass.indexOf('far ') === 0 || this.iconClass.indexOf('fas ') === 0 || this.iconClass.indexOf('fab ') === 0) {
        return true
      } else {
        return false
      }
    },
    iconName() {
      if (!this.isFa) {
        return `#icon-${this.iconClass}`
      } else {
        return `${this.svgClass} fa-icon ${this.iconClass}`
      }
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  line-height: 1.2em;
  text-align: center;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.fa-icon {
  vertical-align: -0.35em;
  color:inherit;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
