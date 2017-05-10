<template>
  <div>
    <transition name="move">
      <div class="food" v-show="flag" ref="food">
        <!-- 内容部分 -->
        <div class="food-content">
          <div class="image-header">
            <img :src="foodDetail.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{foodDetail.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{foodDetail.sellCount}}份</span>
              <span class="rating">好评率{{foodDetail.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{foodDetail.price}}</span><span class="old" v-show="foodDetail.oldPrice">￥{{foodDetail.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper" v-show="foodDetail.count || foodDetail.count!==0">
              <cartcontrol :food="foodDetail"></cartcontrol>
            </div>
            <div @click.stop.prevent="addFirst" class="buy" v-show="!foodDetail.count || foodDetail.count===0">加入购物车
            </div>
          </div>
          <!-- 商品详情 -->
	      <split v-show="foodDetail.info"></split>
	      <div class="info" v-show="foodDetail.info">
	        <h1 class="title">商品信息</h1>
	        <p class="text">{{foodDetail.info}}</p>
	      </div>
	      <split></split>
	      <!-- 评价 -->
	      <div class="rating">
	      	<h1 class="title">商品评价</h1>
	      	<!-- <ratingselect :desc="desc" :select-type="selectType" :ratings="foodDetail.ratings" :only-content="onlyContent" @ratingType="ratingType" @toggleContent="toggleContent"></ratingselect> -->
          <ratingselect :desc="desc" :ratings="foodDetail.ratings" @ratingType="ratingType" @toggleContent="toggleContent"></ratingselect>
          <!-- 评价列表 -->
          <div class="rating-wrapper">
            <ul v-show="foodDetail.ratings && foodDetail.ratings.length">
            <!-- 按需显示 -->
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in foodDetail.ratings"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
          <div class="no-rating" v-show="!foodDetail.ratings || !foodDetail.ratings.length">暂无评价</div>
        </div>
	      </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';
import {formatDate} from '../../common/js/date.js';
// 默认值
const ALL = 2;
export default {
  props: {
    foodDetail: {
      type: Object
    }
  },
  data() {
    return {
      flag: false,
      desc: {
      	all:'全部',
      	positive: '推荐',
      	negative: '吐槽'
      },
      // 子组件将来要修改父组件数据，必须传入对象
      selectType: ALL,
      onlyContent: false
    }
  },
  methods: {
    show() {
      this.flag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          // console.log(this.scroll)
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          // console.log(this.scroll)
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.flag = false
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.foodDetail, 'count', 1);
    },
    needShow(type, text) {
      // 如果只显示内容且不存在内容
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {//显示全部
        return true;
      }else{
        return this.selectType === type
      }
    },
    // 子组件数据改变，告诉父组件
    ratingType(type) {
	    this.selectType = type;
	    this.$nextTick(() => {
	    this.scroll.refresh();
    })
    },
    toggleContent(onlyContent){
    	this.onlyContent = onlyContent;
	    this.$nextTick(() => {
	    this.scroll.refresh();
	   })
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      // console.log(time);
      // console.log(date);
      return formatDate(date,'yyyy-MM-dd hh:mm');
    }
  }
}
</script>
<!-- 曾经犯下缩进错误 -->
<style lang="stylus">
.move-enter-active, .move-leave-active
  transition:all .2s linear
  transform: translate3D(0,0,0)
.move-enter, .move-leave-active
  transform: translate3D(100%,0,0)
.food
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background: #fff
  .food-content
    .image-header
      position:relative
      width:100%
      height:0
      padding-top:100%
      img
        position:absolute
        top:0
        left:0
        width:100%
      height:100%
      .back
        position:absolute
        top:10px
        left:0
        .icon-arrow_lift
          display:block
          padding:10px
          font-size:20px
          color:#fff
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>