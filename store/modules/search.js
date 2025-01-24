const STORAGE_KEY = 'search-list';
const HISTORY_MAX = 10;

export default {
  // 独立命名空间
  namespaced: true,
  // 通过 state 声明数据
  state: () => ({
    // 优先从 storage 中读取
    searchData: uni.getStorageSync(STORAGE_KEY) || []
  }),
  // 更改 state 数据的唯一方式是：提交 mutations
  mutations: {
    /**
     * 在 store 上注册 mutation，处理函数总是接受 state 作为第一个参数，payload 作为第二个参数（可选）
     */
    saveToStorage(state) {
      //本地存储
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.searchData
      });
    },
    /**
     * 添加数据
     */
    addSearchData(state, val) {
      if (!val) return;
      const index = state.searchData.findIndex((item) => item === val);
      if (index !== -1) {
        state.searchData.splice(index, 1);
      }
      // 判断是否超过了最大缓存数量
      if (state.searchData.length > HISTORY_MAX) {
        state.searchData.splice(HISTORY_MAX - 1, state.searchData.length - HISTORY_MAX - 1);
      }

      state.searchData.unshift(val);
      // vuex 模块中，通过this.commit 函数调用 mutation
      // this.commit('模块名/mutation名')
      this.commit('search/saveToStorage');
    },
    /**
     * 删除指定数据
     */
    removeSearchData(state, index) {
      state.searchData.splice(index, 1);
      // 调用 saveToStorage
      this.commit('search/saveToStorage');
    },
    /**
     * 删除所有数据
     */
    removeAllSearchData(state) {
      state.searchData = [];
      // 调用 saveToStorage
      this.commit('search/saveToStorage');
    }
  }
};
