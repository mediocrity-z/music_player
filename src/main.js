import Vue from 'vue'
import ElementUI, { Empty ,Avatar, Button ,Col,Input, TabPane, Tabs ,Message,  Badge,Autocomplete} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';
import axios from 'axios'
import App from './App.vue'


// 全局过滤器 参数1名称 参数2要过滤的值的方法
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)
  // ES7 padStart() String的方法，参数1字符串个数，参数2不足时候用其补全
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.use(ElementUI);
Vue.use(Button)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Col)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Empty)
Vue.use(Autocomplete)
Vue.prototype.$http=axios
Vue.prototype.$message=Message
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
