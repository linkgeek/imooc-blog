import Vue from 'vue';
import App from './App';

// 导入 vuex 实例
import store from './store';
// 引入公共样式
import './styles/global.scss';
// 文章详情样式
import './styles/article-detail.scss';
// 导入过滤器
import * as filters from './filters';

// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false; //Vue在生产环境启动时是否显示提示信息
App.mpType = 'app'; //用于区分应用程序类型，app表示原生应用

//声明当前应用实例
const app = new Vue({
  ...App,
  store // store 对象挂载到vue实例中，所有组件能够直接从store中获取到全局的数据
});

app.$mount();
