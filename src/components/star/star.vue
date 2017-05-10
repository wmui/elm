<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="item in items" :class="item"></span>
  </div>
  <!-- <div class="star" class="star-48">
    <span class="star-item" class="on"></span>
    <span class="star-item" class="half"></span>
    <span class="star-item" class="off"></span>
  </div> -->
</template>
<script>
const starNum = 5;
const clsOn = 'on';
const clsHalf = 'half';
const clsOff = 'off';
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  // 计算属性
  computed: {
    // star-24 stat-36 star-48
    starType() {
      return 'star-' + this.size;
    },
    items() {
      let result = [];
      // score结果有整星和半星两种情况
      let score = Math.floor(this.score * 2) / 2;
      // 获得布尔值
      let hasHalf = score % 1 !== 0;
      // 取得整星个数
      let integer = Math.floor(score);
      // 添加整星
      for (var i = 0; i < integer; i++) {
        result.push(clsOn);
      }
      // 添加半星
      if (hasHalf) {
        result.push(clsHalf);
      }
      // 添加暗星
      while (result.length < starNum) {
        result.push(clsOff);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl";
  @import "../../common/stylus/mixin.styl";
  .star
    font-size:0
    .star-item
      display:inline-block
      background-repeat:no-repeat
    &.star-48
      .star-item
        width:20px
        height:20px
        background-size:20px 20px
        margin-right:22px
        &:last-child
          margin-right:0
        &.on
          bg-image("star48_on")
        &.half
          bg-image("star48_half")
        &.off
          bg-image("star48_off")
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
