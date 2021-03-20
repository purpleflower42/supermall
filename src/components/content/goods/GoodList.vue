<template>
  <div class="goods">
    <!-- {{goods}} -->
    <good-list-item v-for="(item, index) in goods" :key="index" :goodsitem="item" />
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

 export default {
   name: "GoodList",
   components: {
     GoodListItem
   },
   props: {
     goods: {
       type: Array,
       default() {
         return []
       }
     }
   }
 }
</script>

<style scoped>
/* .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
} */
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>