<template>
    <div class="cover">
        <!-- 用布尔值动态绑定属性控制动画的播放和暂停 -->
        <img class="playBar" :class="{playing1:!isPlaying}" src="../assets/player_bar.png">
        <img class="disc" :class="{playing2:isPlaying}" src="../assets/disc.png" alt="">
        <img class="cover" :class="{playing2:isPlaying}" :src="imgUrl" alt="">
    </div>
</template>
<script>
import hub from './eventBus'
export default {
    
  data(){
      return{
        //   歌曲封面图片的地址
       imgUrl:'',
      //  控制动画的播放与暂停
       isPlaying:false
      }
  },
  mounted(){
    //   接收list组件传递过来的数据
      hub.$on('sendImg',(url)=>{
      this.imgUrl=url
      })
      // 接收player组件传递过来的数据
      hub.$on('sendState',(state)=>{
       this.isPlaying=state
      })
  }
}
</script>
<style lang="less" scoped>
// 定义的旋转动画
@keyframes Rotate {
  0%{
    transform: rotateZ(0);
  }
  100%{
  transform: rotateZ(360deg);
  }
}
.cover{
    position: relative;
    .playBar{
    position: absolute;
    left: 330px;
    z-index: 999;
    top: -30px;
    transition: 1s;
    transform-origin: 12px 12px;
    }
    .disc{
        position: absolute;
        left: 210px;
        z-index: 990;
        top: 50px;
    }
    .cover{
        position: absolute;
        z-index: 980;
        width: 150px;
        height: 150px;
        top: 100px;
        right: 250px;
       animation-name: Rotate;
animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 5s;
    }

    // 动画播放时的样式
    .playing1{
      transform: rotate(-25deg);
    }
    .playing2{
 animation-play-state: running;
    }
    
}
</style>