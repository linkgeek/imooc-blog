// 1.导入 Vue 和 Vuex
import Vue from 'vue';
// uniapp 已默认安装，不需要重新下载
import Vuex from 'vuex';

// 导入向外暴露的 store 对象
import search from './modules/search';
import user from './modules/user';
import video from './modules/video';

// 2.安装 Vuex 插件
Vue.use(Vuex);

// 3.创建 store 实例
const store = new Vuex.Store({
  // 如果将store分成一个个的模块的话，则需要用到modules。
  // 然后在每一个module中写state, getters, mutations, actions等。
  modules: {
    search,
    user,
    video
  }
});

export default store;
