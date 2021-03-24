<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    
    <scroll class="content"
            ref="homeScroll"
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true" 
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"
      @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
   
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
import Scroll from "components/common/scroll/Scroll"
import BackTop from 'components/content/backTop/BackTop'

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
     Scroll,
     BackTop
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
       isShowBackTop: false
     }
   },
   computed: {
     showGoods() {
       return this.goods[this.currentType].list
       
     },
     
    //  pop1() {
    //    return this.goods.[this.currentType].list
    //  }
   },
   //watch监听某个数据的变化
  //  watch: {
  //   //  //这里使用计算属性showGoods来监听数据传输
  //   //  showGoods() {
  //   //    //当获取到数据然后渲染到新的dom的时候，使用$nextTick回调函数
  //   //    this.$nextTick(function() {
  //   //      //通过$refs获取组件Scroll，调用它的方法从而执行滚动的代码
  //   //      this.$refs.homeScroll.scrollStart();
  //   //      console.log(123);
  //   //    })
  //   //  }

  //  },
   created() {
     //1.请求多个数据
     this.dlHomeMultidata();

     //2.请求商品数据
     this.dlHomeGood('pop');
     this.dlHomeGood('new');
     this.dlHomeGood('sell');

     //3.监听图片数据，每次传入新数据，刷新scroll
     this.$bus.on('itemImageLoad', () => {
       this.$refs.homeScroll.refresh()
     })
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
     backClick() {
       this.$refs.homeScroll.ScrollTo(0, 0);
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

         this.$refs.homeScroll.finishPullUp()
       })
     },

     contentScroll(position) {
       this.isShowBackTop = (-position.y) > 1000
     },

     loadMore() {
       this.dlHomeGood(this.currentType);
     },



   },
   mounted() {
    
   },
   beforeDestroy() {
     this.$bus.off('itemImageLoad', () => {
       this.$refs.homeScroll.refresh()
     })
   }
 }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
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

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  /* .content {
    height: calc(100% - 93px);
    margin-top: 44px;
    overflow: hidden;
  } */
</style>