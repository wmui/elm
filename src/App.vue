<template>
  <div id="app">
    <!-- 头部组件 -->
    <v-header :seller="seller"></v-header>
    <!-- tab区域 -->
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由设置 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import {urlParse} from './common/js/util.js';
// 这里的数据可以通过props传递给子组件
export default {
  data() {
    return {
      seller: {
      }
    };
  },
  // 请求数据并传递给seller
  created() {
    // this.$axios.get('/api/seller?id=' + this.seller.id).then((response) => {
    this.$axios.get('/api/seller').then((response) => {
        // success
        // this.seller = Object.assign({},this.seller,response.data.data)
        this.seller = response.data.data
      },(error) => {
        // error
        console.log(error)
      });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/base.styl";
  @import "./common/stylus/mixin.styl";

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
