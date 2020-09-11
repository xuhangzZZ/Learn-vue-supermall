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
    name: 'Scroll',
    data(){
        return{
            scroll: null
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click: true,
            pullUpLoad: this.pullUpLoad
        })
        
        if(this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll',(position => {
                this.$emit('scroll',position);
            }))
        }
        
        if(this.pullUpLoad){
            //监听上拉事件
            this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp')
            })
        }
        
    },
    methods: {
        //time=300，如果不传第三个参数，默认为300
        scrollTo(x, y, time = 300){
            this.scroll && this.scroll.scrollTo(x,y,time);
        },
        finishPullUp(){
            this.scroll.finishPullUp();
        },
        refresh(){
            this.scroll && this.scroll.refresh();
        },
        getScrollY(){
            return this.scroll?this.scroll.y:0
        }
    },
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>

</style>