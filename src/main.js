import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueCookie from 'vue-cookie'
import store from './vuex/store'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

import Util from './libs/util'
import Filters from './libs/filters'

Filters(Vue)
Vue.use(Util)
Vue.use(iview)
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'small'})

// 这里为了让效果明显一些加了延时
router.afterEach((to, from) => {
  store.dispatch('app/onLoading', false)
  iview.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
