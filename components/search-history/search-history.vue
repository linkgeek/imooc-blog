<template>
  <view class="search-history-container">
    <!-- 3. 使用导入的 vuex 模块中的数据 -->
    <!-- <div>{{ msg }}</div> -->

    <!-- title 区域 -->
    <view class="search-history-title-box">
      <view class="search-history-title">搜索历史</view>
      <view v-if="!isShowClear">
        <uni-icons type="trash" @click="isShowClear = true" />
      </view>
      <view v-else>
        <text class="txt" @click="onClearAll">全部删除</text>
        <text class="txt" @click="isShowClear = false">完成</text>
      </view>
    </view>
    
    <!-- 内容区域 -->
    <view class="search-history-box">
      <block v-for="(item, index) in searchData" :key="index">
        <view class="search-history-item" @click="onHistoryItemClick(item, index)">
          <text class="history-txt line-clamp nowrap">{{ item }}</text>
          <uni-icons v-show="isShowClear" type="clear" />
        </view>
      </block>
    </view>
  </view>
</template>

<script>
// 1. 导入 mapState 函数
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'search-history',
  props: {
    /**
     * @deprecated
     */
    // searchData: {
    //   type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      isShowClear: false
    };
  },
  methods: {
    ...mapMutations('search', ['removeSearchData', 'removeAllSearchData']),
    onClearAll() {
      uni.showModal({
        title: '提示',
        content: '删除搜索历史记录？',
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            // 删除 searchData
            this.removeAllSearchData();
            // 返回状态
            this.isShowClear = false;
          }
        }
      });
    },
    onHistoryItemClick(item, index) {
      if (this.isShowClear) {
        // 删除指定的 searchData
        this.removeSearchData(index);
      } else {
        //搜索
        this.$emit('onItemClick', item);
      }
    }
  },
  computed: {
    // 2. 在 computed 中，通过 mapState 函数，注册 state 中的数据，导入之后的数据可直接使用（就像使用 data 中的数据一样）
    // mapState(模块名, ['字段名','字段名','字段名'])
    ...mapState('search', ['searchData'])
  }
};
</script>

<style lang="scss" scoped>
.search-history-container {
  padding: $uni-spacing-col-lg $uni-spacing-row-lg;
  .search-history-title-box {
    display: flex;
    justify-content: space-between;

    .search-history-title {
      font-size: $uni-font-size-sm;
      color: $uni-text-color;
      padding: $uni-spacing-col-sm $uni-spacing-row-sm;
    }
    .txt {
      color: $uni-text-color-grey;
      font-size: $uni-font-size-sm;
      padding: $uni-spacing-col-sm $uni-spacing-row-sm;
    }
  }
  .search-history-box {
    margin-top: $uni-spacing-col-lg;
    .search-history-item {
      width: 50%;
      box-sizing: border-box;
      display: inline-block;
      padding: $uni-spacing-col-base $uni-spacing-row-base;
      position: relative;
      .history-txt {
        width: 95%;
        display: inline-block;
        color: $uni-text-color;
        font-size: $uni-font-size-base;
      }
    }
    .search-history-item:nth-child(odd):before {
      content: ' ';
      border-left: 1px solid #999;
      display: inline-block;
      height: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
  }
}
</style>
