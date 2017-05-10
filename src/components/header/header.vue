<template>
  <div class="header">
  <!-- 内容 -->
    <div class="content-wrap">
      <!-- 头像 -->
      <div class="avatar">
        <img width="74" height="74" :src="seller.avatar">
      </div>

      <!-- 内容区块 -->
      <div class="content">
        <!-- 标题 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <!-- 描述 -->
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <!-- 活动 -->
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>

      <!-- 活动数量 -->
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

  <!-- 模糊背景 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

  <!-- 公告 -->
    <div class="bulletin-wrap" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

  <!-- 浮层sticky footer布局 -->
  <transition name="fade">
    <div class="detail" v-show="detail">
      <div class="detail-wrap clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <!-- star组件 -->
          <div class="star-wrap">
            <v-star :size="48" :score="seller.score"></v-star>
          </div>
          <!-- 优惠信息标题 -->
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <!-- 优惠信息列表 -->
          <ul class="support" v-if="seller.supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <!-- 商家公告 -->
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <!-- 公告描述 -->
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
  </div>
</template>
<script>
import star from '../star/star.vue';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  // 返回一个对象
  data() {
    return {
      detail: false
    };
  },
  // 点击元素调用方法，动态设置显示隐藏
  methods: {
    showDetail() {
      this.detail = true;
    },
    hideDetail() {
      this.detail = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  // 注册star组件
  components: {
    'v-star': star
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl";
  @import "../../common/stylus/mixin.styl";

  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrap
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      // 头像
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        // 商品标题
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        // 商品描述
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 10px
      // 活动数量
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    // 模糊背景
    .background
      position: absolute
      top:0
      left:0
      width:100%
      height:100%
      filter:blur(10px)
      z-index:-1
    // 公告
    .bulletin-wrap
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    /* 详情页 */
    .fade-enter-active,.fade-leave-active
      transition:opacity .5s
    .fade-enter,.fade-leave-active
      opacity:0
    .detail
      position: fixed
      top:0
      left:0
      width:100%
      height:100%
      overflow:auto
      background:rgba(0, 0, 0, .75)
      font-size:0
      z-index:100
      .detail-wrap
        width:100%
        min-height:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
          font-size:14px
          // 星级评论
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrap
            margin-top: 18px
            padding: 2px 0
            text-align: center
          // 优惠标题
          .title
            display:flex
            width:80%
            margin:24px auto 28px auto
            .line
              flex:1
              position:relative
              top:-6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              font-weight: 700
              font-size: 14px
          // 优惠列表
          .support
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: 16px
                font-size: 12px
          // 商家描述
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      // 关闭按钮
      .detail-close
        position: relative
        width:32px
        height:32px
        margin:-64px auto 0 auto
        font-size:32px
        clear:both
</style>
