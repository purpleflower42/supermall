<template>
  <div class="goods-item">
    <img :src="goodsitem.show.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
 export default {
   name: "GoodListItem",
   props: {
     goodsitem: {
       type: Object,
       default() {
         return []
       }
     }
   },
   methods: {
     imageLoad() {
       this.$bus.emit('itemImageLoad')
     },
   }
 }
</script>

<style scoped>
/* .good-list-item {
  width: 47%;
  font-size: 14px;
}
.good-list-item img {
  width: 100%;
  border-radius: 7px;
}
.good-list-item-textbox {
  text-align: center;
  margin-bottom: 3px;
}
.good-list-item-textbox p {
  height: 16px;
  line-height: 16px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 3px 0;
}
.good-list-item-textbox span.price {
  color: deeppink;
  margin-right: 7px;
} */

  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>