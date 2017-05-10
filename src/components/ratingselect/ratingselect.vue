<template>
  <div class="ratingselect">
    <div class="rating-type">
      <!-- 全部 -->
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <!-- 满意 -->
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
      <!-- 吐槽 -->
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <!-- 只看有内容的评价 -->
    <div @click="toggleContent($event)" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
  export default {
    props: {
      desc: {
        type: Object,
        default() {
          return {}
        }
      },
      ratings: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {  
        selectType: 2,
        onlyContent: false
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return
        }
        this.selectType = type;
        // 把数据传递给父组件
        this.$emit('ratingType',this.selectType);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$emit('toggleContent',this.onlyContent);
      }
    },
    computed: {
      // 判断rateType 过滤数组
      positive() {
        return this.ratings.filter((item) => {
          return item.rateType === POSITIVE
        })
      },
      negative() {
        return this.ratings.filter((item) => {
          return item.rateType === NEGATIVE
        })
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>