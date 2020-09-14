<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" 
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import {mapActions} from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

export default {

    name: 'Detail',
    data(){
        return{
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            currentIndex: 0
        }
    },
    methods:{
        ...mapActions(['addCart']),
        imageLoad(){
            this.$refs.scroll.refresh();

            this.themeTopYs = [];

            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
        },
        
        contentScroll(position){
            const positionY = -position.y;

            let length = this.themeTopYs.length;
            for(let i = 0; i < length; i++){

                if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])  || (i === length -1 && positionY >= this.themeTopYs[i])))
                {
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex; 
                }
                
            }
        },

        addToCart(){
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;

            this.addCart(product).then(res => {
                this.$toast.show(res, 2000);
            })
            // this.$store.commit('addCart',product);
            // this.$store.dispatch('addCart',product);
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList
    },
    created(){
        this.iid = this.$route.params.iid;

        getDetail(this.iid).then(res => {
            //顶部轮播图数据
            console.log(res)
            const data = res.result;
            this.topImages = data.itemInfo.topImages;

            //获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

            //获取店铺信息
            this.shop = new Shop(data.shopInfo);

            //保存商品的详情数据
            this.detailInfo = data.detailInfo;

            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0];
            }


            //DOM渲染完成后，执行此函数。但是图片可能没有加载完毕 offsetTop值不对，大多数是图片没有加载完
            // this.$nextTick(() => {

            //     this.themeTopYs = [];

            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            //     console.log(this.themeTopYs);
            // })
        })

        

    
        getRecommend().then(res => {
            this.recommends = res.data.list;
        })
    }
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content{
        height: calc(100% - 93px);
    }
</style>