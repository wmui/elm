<template>
  <div class="goods">
    <div class="menu-wrap" ref="menuWrap">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span class="icon" :class="classMap[item.type]" v-show="item.type>0"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <!-- 商品标题 -->
          <h1 class="title">{{item.name}}</h1>
          <!-- 商品列表 -->
          <ul>
            <li @click="selectedFood(food, $event)" v-for="food in item.foods" class="food-item">
            <!-- 图片 -->
              <div class="icon"><img width="57" height="57" :src="food.icon"></div>
            <!-- 内容 -->
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <!-- 商品价格 -->
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <!-- 控制按钮 -->
                <div class="cartcontrol-wrap">
                  <!-- 传递数据给子组件 -->
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li >
      </ul>
    </div>
    <!-- 底部购物车 -->
    <v-shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
    <!-- 详情页数据 -->
    <v-food :food-detail="foodDetail" ref="food"></v-food>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import shopcart from '../shopcart/shopcart.vue';
  import fooddetail from '../food/food.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        scrollY: 0,
        listHeight: [],
        foodDetail: {}
      };
    },
    computed: {
      // 根据scrollY的变化获取索引
      currentIndex() {
        for (var i = 0; i < this.listHeight.length; i++) {
          var height1 = this.listHeight[i];
          var height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
           if (food.count) {
              foods.push(food);
              // console.log(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        this.goods = response.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calcHeight();
        });
      });
    },
    components: {
      'v-cartcontrol': cartcontrol,
      'v-shopcart': shopcart,
      'v-food': fooddetail
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrap, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
          click: true,
          probeType: 3
        });
        // 滚动事件
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      // 计算每个列表总高度
      _calcHeight() {
        let foodsList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodsList.length; i++) {
          height += foodsList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodsList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
        let el = foodsList[index];
        // 滚动到指定元素位置
        this.foodsScroll.scrollToElement(el, 300);
      },
      // foodDetail 数据传递给子组件
      selectedFood(food,event) {
        // 点击了购物车按钮就return掉
        if (!event._constructed) {
          return;
        }
        this.foodDetail = food;
        // 调用food组件的show方法
        this.$refs.food.show();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl";
  @import "../../common/stylus/mixin.styl";
  .goods
    display: flex
    position: absolute
    top: 184px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrap
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrap
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
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
              font-size: 12px
              color: rgb(147, 153, 159)
          .cartcontrol-wrap
            position: absolute
            right: 0
            bottom: 12px
</style>
