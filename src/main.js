// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
// 全局组件(支出的备注)
Vue.component('my-item-zh', {
  functional: true,
  render: function (h, ctx) {  // 渲染组件
    var item = ctx.props.item
    return h('li', ctx.data, [
      h('div', {attrs: {class: 'name'}}, [item.value]),
      h('span', {attrs: {class: 'addr'}}, [item.address])
    ])
  },
  props: {
    item: {type: Object, required: true}
  }
})
