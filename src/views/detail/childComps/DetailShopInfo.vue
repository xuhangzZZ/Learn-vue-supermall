<template>
    <div class="shop-info" v-if="Object.keys(shop).length !== 0">
      <div class="shop-top">
        <img :src="shop.logo" alt="">
        <span class="title">{{shop.name}}</span>
      </div>
      <div class="shop-middle">
        <div class="shop-middle-item shop-middle-left">
          <div class="info-sells">
            <div class="sells-count">
              {{shop.sells | sellCountFilter}}
            </div>
            <div class="sells-text">总销量</div>
          </div>
          <div class="info-goods">
            <div class="goods-count">
              {{shop.goodsCount}}
            </div>
            <div class="goods-text">全部宝贝</div>
          </div>
        </div>
        <div class="shop-middle-item shop-middle-right">
          <table>
            <tr v-for="(item,index) of shop.score" :key="index">
              <td>{{item.name}}</td>
              <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
              <td class="better" :class="{'better-more': item.isBetter}">
                <span>{{item.isBetter ? '高': '低'}}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="shop-bottom">
        <div class="enter-shop">进店逛逛</div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'DetailShopInfo',
    props:{
      shop:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      sellCountFilter(value){
        if(value<10000) return value;
        return (value/10000).toFixed(1)+'万'
      }
    }
}
</script>

<style scoped>
.shop-info {
  border-bottom: 5px solid #f2f5f8;
  padding: 25px 8px;
}
.shop-top {
  align-items: center;
  line-height: 45px;
  display: flex;
}
.shop-top img {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  height: 45px;
  width: 45px;
}
.shop-top .title {
  vertical-align: center;
  margin-left: 10px;
}
.shop-middle {
  align-items: center;
  margin-top: 15px;
  display: flex;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  border-right: 1px solid rgba(0, 0, 0, 0.1); 
  justify-content: space-evenly;
  text-align: center;
  color: #333333;
  display: flex;
  
}
.sells-count,
.goods-count {
  font-size: 18px;
}
.sells-text,
.goods-text {
  margin-top: 10px;
  font-size: 12px; 
}
.shop-middle-right {
  color: #333333;
  font-size: 13px;
}
.shop-middle-right table {
  margin-left: 30px;
  width: 120px;  
}
.shop-middle-right table td {
  padding: 5px 0;
}
.shop-middle-right .score {
  color: #5ea732;
}
.shop-middle-right .score-better {
  color: #f13e3a;
}
.shop-middle-right .better span {
  background-color: #f13e3a;
  text-align: center;
  color: #ffffff;
  padding: 3px;
}
.shop-middle-right .better-more span {
  background-color: #5ea732;
}
.shop-bottom {
  text-align: center;
  margin-top: 10px;
}
.enter-shop {
  background-color: #f2f5f8;
  display: inline-block;
  border-radius: 10px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  width: 150px;
  height: 30px; 
}
</style>