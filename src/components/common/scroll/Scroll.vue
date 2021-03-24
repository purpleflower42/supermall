<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

 export default {
   name: "Scroll",
   props: {
     probeType: {
       type: Number,
       default: 0
     },
     pullUpLoad: {
       type: Boolean,
       default: false
     },

   },
   data() {
     return {
       scroll: null
     }
   },
   methods: {
     refresh() {
       console.log('refresh');
       this.scroll.refresh()
     },
     ScrollTo(x, y, time=1000) {
       this.scroll.scrollTo(x, y, time);
     },
     finishPullUp() {
       this.scroll.finishPullUp()
     }
   },
   mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
         click: true,
         probeType: this.probeType,
         pullUpLoad: this.pullUpLoad
       })
       //监听滚动事件，将滚动到的坐标传到home组件
       this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
       })

       this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
       })
   },
  //  watch: {
  //    List() {
  //      this.$nextTick(() => {
  //        console.log(123);
  //        this.refresh()
  //       })
  //    }
  //  }
 }
</script>

<style scoped>

</style>