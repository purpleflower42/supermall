<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" @click="itemclick(index)" :key="index" :class="{active: index === currentIndex}" class="tab-control-item">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
 export default {
   name: "TabControl",
   props: {
     titles: {
       type: Array,
       default() {
         return []
       }
     }
   },
   data() {
     return {
       currentIndex: 0
     }
   },
   methods: {
     itemclick(index) {
       this.currentIndex = index;
       this.$emit('tabClick',index)
     }
   }
 }
</script>

<style scoped>
.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-high-text);
  padding: 5px;
}
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
}
</style>