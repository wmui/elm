// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// 引入自定义组件
import App from './App.vue';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

/* 设置路由 */
Vue.use(VueRouter);
Vue.use(VueResource);
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  // 当请求数据的时候，执行组件，让组件处理数据
  routes: [
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/seller', component: seller }
  ]
});

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');

// 打开的默认路径
router.push('/goods');
