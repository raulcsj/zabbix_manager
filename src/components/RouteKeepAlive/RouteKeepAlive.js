import { getFirstComponentChild } from './helpers'
import { isRegExp, remove } from './utils'

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache(keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheByPath(keepAliveInstance, pathInclude) {
  const { cache, keys, _vnode } = keepAliveInstance
  const keyCount = keys.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = 0
    return accumulator
  }, {})
  for (const key in cache) {
    for (const path of pathInclude) {
      if (key.includes(path)) {
        keyCount[key]++
        break
      }
    }
  }
  for (const [key, value] of Object.entries(keyCount)) {
    if (value === 0) {
      const cachedNode = cache[key]
      if (cachedNode) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry(
  cache,
  key,
  keys,
  current
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes = [String, RegExp, Array]

export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    pathInclude: patternTypes,
    max: [String, Number]
  },
  created() {
    this.cache = Object.create(null)
    this.keys = []
  },

  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted() {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
    this.$watch('pathInclude', (val) => {
      pruneCacheByPath(this, val)
    })
  },

  render() {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    const fullPath = this.$route.fullPath
    if (componentOptions) {
      // check pattern
      const name = getComponentName(componentOptions)
      const { include, exclude, pathInclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name)) ||
        (exclude && fullPath && !pathInclude.includes(fullPath)) //  判断当前路由fullPath判断是否在pathInclude来决定是否缓存
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
