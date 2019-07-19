import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import './styles/element-variables.scss'

import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import * as filters from './filters' // global filters

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'

import RouteKeepAlive from '@/components/RouteKeepAlive'

import { tagsView } from '@/mixin'

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// set ElementUI lang to zh-CN
Vue.use(ElementUI, { locale })
Vue.options.components['KeepAlive'] = RouteKeepAlive.RouteKeepAlive

Vue.config.productionTip = false

//  增加tagsView页功能
Vue.mixin(tagsView)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
