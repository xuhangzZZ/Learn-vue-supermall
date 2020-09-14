import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.use(toast)

//解决移动端300延迟问题
FastClick.attach(document.body);

//图片懒加载
Vue.use(vueLazyLoad);

Vue.config.productionTip = false

//new一个Vue实例作为事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
