<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore"> <!--  -->
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
            <goods-list :goods="goods[currentType].list"></goods-list>
        </scroll>
        <!-- 监听原生组件，必须要加.native -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>

//导入的自身内部组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

//导入的公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'



export default {
    name: 'Home',
    components: {
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data(){
        return{
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []}
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0
        }
    },
    activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh();
    },
    deactivated(){
        this.saveY = this.$refs.scroll.getScrollY()
    },
    destroyed(){
        console.log(1111);
    },

    //生命周期函数，一创建成功就请求数据
    created(){
        this.getHomeMultidata();
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

        
    },
    mounted(){
        
        //监听图片加载完毕
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.$bus.$on('itemImageLoad',() => {
            refresh();
        })

        
        
    },
    methods: {

        

        /*
            事件监听相关方法
        */
        tabClick(index){
            switch(index){
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
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0);
        },
        contentScroll(position){
            //判断BackTop是否显示
            this.isShowBackTop = (- position.y) > 1000

            //决定tabControl是否吸顶
            this.isTabFixed = (- position.y) > this.tabOffsetTop
        },
        loadMore(){
            this.getHomeGoods(this.currentType);
        },
        swiperImageLoad(){
            //获取tabControl的offsetTop
            //每一个组件都有$el属性，用于获取组件中的元素
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },
        /*
            网络请求相关方法
        */
        // 请求多个数据
        getHomeMultidata(){
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        },
        //请求商品数据
        getHomeGoods(type){
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then(res => {
                // console.log(res.data);
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;

                this.$refs.scroll.finishPullUp();
            })
        }
    }
        
        
}
</script>

<style scoped>

    #home{
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }

    .home-nav{
        background-color: var(--color-tint);

        /* position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9; */
        color: #fff;
    }

    .tab-control{
        position: relative;
        z-index: 9;
    }

    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }




</style>