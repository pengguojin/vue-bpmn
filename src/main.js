import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
// 以下为bpmn工作流绘图工具的样式
import './styles/app.scss'

// import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css' // 右边工具栏样式

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
