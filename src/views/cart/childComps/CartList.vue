<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="(item,index) in cartList" 
            :key="index"
            :product="item"></cart-list-item>
        </scroll>
    </div>
</template>

<script>

import Scroll from 'components/common/scroll/Scroll'

import CartListItem from './CartListItem'


import {mapGetters} from 'vuex'

export default {
    name: 'CartList',
    components: {
        Scroll,
        CartListItem,
        
    },
    computed: {
        ...mapGetters(['cartList'])
    },
    activated(){
         this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
    .cart-list{
        height: calc(100% - 44px - 49px - 47px);
        overflow: hidden;
}
.content{
    height:100vh;  

}
/* .cart-recommend{
  margin-top: 100px;
  width: 100%;
}
.cart-recommend img{
    width: 100%;
    height: 33px;
} */
</style>