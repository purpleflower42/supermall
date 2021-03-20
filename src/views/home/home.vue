<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" />
    <feature-view></feature-view>

    <tab-control class="tab-control" :titles="['流行','新款','精选']"
    @tabClick="tabClick"></tab-control>
    <good-list :goods="showGoods"></good-list>
   
  </div>
</template>

<script>
//子组件引入
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

//公共组件引入
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/TabControl/TabControl"
import GoodList from "components/content/goods/GoodList"

//网络组件引入
import {getHomeMultidata, getHomeGood} from 'network/home'

 export default {
   name: "Home",
   components: {
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
     GoodList,
   },
   data() {
     return {
       banners: [],
       recommends: [],
       goods: {
         'pop': {page: 0, list: []},
         'new': {page: 0, list: []},
         'sell': {page: 0, list: []}
       },
       currentType: 'pop',
     }
   },
   computed: {
     showGoods() {
       return this.goods[this.currentType].list
     }
   },
   created() {
     //1.请求多个数据
     this.dlHomeMultidata();

     //2.请求商品数据
     this.dlHomeGood('pop');
     this.dlHomeGood('new');
     this.dlHomeGood('sell');
   },
   methods: {
     //事件监听相关
     tabClick(index) {
       switch (index) {
         case 0:
           this.currentType = 'pop'
           break
         case 1:
           this.currentType = 'new'
           break
         case 2:
           this.currentType = 'sell'
           break    
       }
     },

     //网络请求相关
     dlHomeMultidata() {
       getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
     },

     dlHomeGood(type) {
       const page = this.goods[type].page + 1
       getHomeGood(type,page).then(res => {
         this.goods[type].list.push(...res.data.list)
         this.goods[type].page++
       })
     },


   }
 }
</script>

<style>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }
  
  .tab-control {
    position: sticky;
    top: 44px;
    background-color: #fff;
  }
</style>