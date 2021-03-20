<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key='index'>
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
// import {MySwiper, MySwiperItem} from 'components/common/swiper'
// import MySwiper from 'components/common/swiper'
// import MySwiperItem from 'components/common/swiper'



 export default {
   name: "HomeSwiper",
   props: {
     banners: {
       type: Array,
       default() {
         return []
       }
     }
   },
   components: {
     Swiper,
     SwiperItem,
    //  MySwiper,
    //  MySwiperItem
   }
 }
</script>

<style scoped>

</style>